<template>
  <a-drawer
    title="创建 ApiKey"
    width="480"
    :closable="true"
    @close="handleClose"
    :visible="setting.visible"
  >
    <a-form :form="form" >
      <a-row>
        <a-col :span="24">
          <a-form-item label="Key名称">
            <a-input
              v-decorator="['name', { rules: [{ required: true, message: '请输入Key名称' }] }]"
              placeholder="请输入Key名称"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item label="Key值">
            <a-input
              v-decorator="['value', { rules: [{ required: true, message: '请输入Key值' }] }]"
              placeholder="请输入Key值"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-button type="primary" icon="save" @click="handleSubmit" >保存</a-button>
  </a-drawer>
</template>

<script>
// import api.
import {
  createTenantApiKey as apiCreateTenantApiKey,
  updateTenantApiKey as apiUpdateTenantApiKey
} from '@/api/tenant'
// import component.
import Notification from '@/utils/notification'

export default {
  name: 'TenantApiKeyDetail',
  components: {},
  data () {
    return {
      form: this.$form.createForm(this),
      setting: {
        visible: false,
        tenantId: 0,
        apiKeyId: 0,
        action: 'create' // create or edit
      },
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          switch (this.setting.action) {
            case 'create':
              this.createTenantApiKey(this.setting.tenantId)
              break
            case 'edit':
              this.updateTenantApiKey(this.setting.tenantId, this.setting.apiKeyId)
              break
            default:
              break
          }
          this.$emit('submit') // 触发事件
          this.closeDrawer()
        }
      })
    },
    handleClose () {
      this.closeDrawer()
    },
    openDrawer (tenantId, record) {
      this.setting.visible = true
      this.setting.tenantId = tenantId
      console.log('openDrawer - record', record)
      console.log('openDrawer - tenantId', tenantId)
      if (record === undefined) {
        this.setting.action = 'create'
        record = {}
      } else {
        this.setting.action = 'edit'
        this.setting.apiKeyId = record.id
      }

      this.$nextTick(() => {
        this.form.setFieldsValue({
          name: record.name,
          value: record.value
        })
      })
    },
    closeDrawer () {
      this.form.setFieldsValue({})
      this.setting.apiKeyId = 0
      this.setting.visible = false
    },
    createTenantApiKey (tenantId) {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('createTenantApiKey - values', values)
          const promise = apiCreateTenantApiKey(tenantId, values)
          promise.then(data => {
            this.notification.success(`创建 ApiKey 成功！`)
            this.closeDrawer()
            this.$emit('submit', values)
          }).catch(context => {
            this.notification.httpError(`创建 ApiKey 失败！`, context.response)
          })
        }
      })
    },
    updateTenantApiKey (tenantId, apiKeyId) {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('updateTenantApiKey - values', values)
          const promise = apiUpdateTenantApiKey(tenantId, apiKeyId, values)
          promise.then(data => {
            this.notification.success(`更新 ApiKey 成功！`)
            this.closeDrawer()
            this.$emit('submit', values)
          }).catch(context => {
            this.notification.httpError(`更新 ApiKey 失败！`, context.response)
          })
        }
      })
    }
  }
}
</script>
