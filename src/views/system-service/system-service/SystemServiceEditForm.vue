<template>
  <a-modal
    title="编辑内部服务"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="系统代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['systemCode', {rules: [{required: true, message: '请输入系统代码！'}]}]" />
        </a-form-item>
        <a-form-item label="操作代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['actionCode', {rules: [{required: true, message: '请输入操作代码！'}]}]" />
        </a-form-item>
        <a-form-item label="服务地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['servicePath', {rules: [{required: true, message: '请输入服务地址！'}]}]" />
        </a-form-item>
        <a-form-item label="认证方式配置" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="['authConfigId',{ rules: [{ required: true, message: '请选择认证方式配置！' }]}]"
            placeholder="请选择认证方式配置"
          >
            <a-select-option :value="item.id" v-for="(item) in authConfigs" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { updateSystemService, getSystemServiceAuthConfigs } from '@/api/system-services'
import Notification from '@/utils/notification'

export default {
  data () {
    return {
      notification: new Notification(this.$notification),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      recordId: 0
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    edit (record) {
      this.visible = true
      this.recordId = record.id
      record.servicePath = `${record.baseUrl}:${record.port}/${record.resource}`
      this.$nextTick(() => {
        this.form.setFieldsValue(record)
      })
    },
    fetchData (params = {}) {
      const promise = getSystemServiceAuthConfigs()
      this.loading = true
      promise.then(response => {
        this.authConfigs = response.data
        this.confirmLoading = false
      }).catch(context => {
        this.confirmLoading = false
        this.notification.httpError(`加载Auth Config列表数据失败！`, context.response)
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          console.log('recordId', this.recordId)
          const promise = updateSystemService(this.recordId, values)
          if (promise == null) {
            this.confirmLoading = false
            this.notification.error('服务地址不正确！')
          }
          promise.then(res => {
            this.notification.info('修改成功！')
            this.$emit('ok', values)
            console.log('res===>', res)
          }).catch(err => {
            this.notification.error('修改失败！')
            console.error(`updateSystemService error:${err}`)
          })
          this.visible = false
          this.confirmLoading = false
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
