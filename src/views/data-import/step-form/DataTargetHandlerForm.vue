<template>
  <div>
    <a-form :form="form" style="max-width: 600px; margin: 40px auto 0;min-height: 380px;">
      <a-form-item label="处理程序版本" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-radio-group
          v-decorator="['version', { rules: [{ required: true, message: '请选择处理程序版本' }] }]"
        >
          <a-radio-button :value="1">标准版</a-radio-button>
          <a-radio-button :value="2">定制化版本</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="通知方式" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-radio-group
          v-decorator="['notification', { rules: [{ required: true, message: '请选择通知方式' }] }]"
        >
          <a-radio-button :value="1">不通知</a-radio-button>
          <a-radio-button :value="2">邮件通知</a-radio-button>
          <a-radio-button :value="3">消息提醒</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="失败重试次数" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input-number v-decorator="['retryCount', { rules: [{ required: true, message: '请填写失败重试次数' }] }]" :min="1" :max="10" />
        <span class="ant-form-text">次</span>
      </a-form-item>
    </a-form>
    <a-divider />
    <a-row>
      <a-col :span="10" :offset="10">
        <a-button type="default" @click="prevStep">上一步</a-button>
        <a-button type="primary" @click="nextStep" style="margin-left: 8px">下一步</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import SystemServcieSelect from '@/views/common/select-component/SystemServcieSelect'
// import TenantApiKeySelect from '@/views/common/select-component/TenantApiKeySelect'

export default {
  // components: {
  //   SystemServcieSelect,
  //   TenantApiKeySelect
  // },
  name: 'DataSourceHandlerForm',
  props: {
    formData: { type: Object, default: null }
  },
  mounted () {
    this.$nextTick(() => {
      // 设置form数据
      // this.form.setFields({
      //   tenantCode: { value: this.formData.tenantCode },
      //   actionCode: { value: this.formData.actionCode }
      // })
    })
  },
  // computed: {
  //   systemServiceValue () {
  //     return (this.systemService === undefined || this.systemService.id === 0) ? '' : `${this.systemService.systemCode}-${this.systemService.actionCode}`
  //   }
  // },
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      versionIndex: 2
    }
  },
  methods: {
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          var outputData = {
            tenant: this.tenant,
            apiKey: this.apiKey,
            systemService: this.systemService
          }
          this.$emit('nextStep', 2, outputData)
        }
      })
    },
    prevStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          var outputData = {
            tenant: this.tenant,
            apiKey: this.apiKey,
            systemService: this.systemService
          }
          this.$emit('prevStep', 2, outputData)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
