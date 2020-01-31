<template>
  <a-card class="information-card" :bordered="false" title="服务订阅信息">
    <a-form :form="form">
      <a-form-item label="租户信息" :label-col="labelCol" :wrapper-col="wrapperCol">
        <div>
          <a-row>
            <a-col :span="20">
              <a-input
                v-decorator="['tenant', { rules: [{ required: true, message: '请选择租户' }] }]"
                disabled="disabled"
              >
                <a-icon slot="addonBefore" type="bank" />
              </a-input>
            </a-col>
          </a-row>
        </div>
      </a-form-item>
      <a-form-item label="ApiKey" :label-col="labelCol" :wrapper-col="wrapperCol">
        <div>
          <a-row>
            <a-col :span="20">
              <a-input
                v-decorator="['apiKey', { rules: [{ required: true, message: '请选择ApiKey' }] }]"
                disabled="disabled"
              >
                <a-icon slot="addonBefore" type="key" />
              </a-input>
            </a-col>
            <a-col :span="3" :offset="1">
              <a-button type="primary" icon="swap" @click="showSelectDrawer('tenantApiKey')"></a-button>
            </a-col>
          </a-row>
        </div>
      </a-form-item>
      <a-form-item label="系统服务" :label-col="labelCol" :wrapper-col="wrapperCol">
        <div>
          <a-row>
            <a-col :span="20">
              <a-input
                v-decorator="['systemService', { rules: [{ required: true, message: '请选择系统服务信息' }] }]"
                :disabled="true"
              >
                <a-icon slot="addonBefore" type="thunderbolt" />
              </a-input>
            </a-col>
            <a-col :span="3" :offset="1">
              <a-button type="primary" icon="swap" @click="showSelectDrawer('systemServcie')"></a-button>
            </a-col>
          </a-row>
        </div>
        <system-servcie-select ref="systemServcieSelectDrawer" @select="handleSystemServcieSelect" />
        <tenant-api-key-select ref="tenantApiKeySelectDrawer" @select="handleTenantApiKeySelect" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
        <a-button type="primary" html-type="submit" @click="handleSubmit">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import Notification from '@/utils/notification'
import SystemServcieSelect from '@/views/common/select-component/SystemServcieSelect'
import TenantApiKeySelect from '@/views/common/select-component/TenantApiKeySelect'

export default {
  components: {
    SystemServcieSelect,
    TenantApiKeySelect
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {
          details: []
        }
      },
      required: false
    }
  },
  data () {
    return {
      labelCol: { lg: { span: 3 }, sm: { span: 3 } },
      wrapperCol: { lg: { span: 9 }, sm: { span: 9 } },
      form: this.$form.createForm(this, { name: 'formServiceSubscription' }),
      tenant: {
        id: 0,
        name: '',
        code: ''
      },
      apiKey: {
        id: 0,
        name: '',
        value: ''
      },
      systemService: {
        id: 0,
        systemCode: '',
        actionCode: ''
      },
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {
    this.setServiceSubscription(this.model)
  },
  watch: {
    model (val) {
      this.setServiceSubscription(val)
    }
  },
  computed: {},
  methods: {
    showRuleDetail (action, detail) { },
    handleClose () { },
    handleSubmit () { },
    createRuleDetail (subscriberId, ruleId, entity) { },
    updateRuleDetail (subscriberId, ruleId, entity) { },
    handleDelete (entity) { },
    showSelectDrawer (name) {
      var drawer = null
      if (name === 'systemServcie') {
        drawer = this.$refs.systemServcieSelectDrawer
      }
      if (name === 'tenantApiKey') {
        drawer = this.$refs.tenantApiKeySelectDrawer
      }
      if (drawer !== null) {
        drawer.openDrawer()
      }
    },
    handleSystemServcieSelect (data) {
      this.systemService = data
      this.setSystemServcieData(data)
      console.log('systemService', this.systemService)
    },
    handleTenantApiKeySelect (data) {
      this.tenant = data.tenant
      this.apiKey = data.apiKey
      this.setTenantApiKeyData(data)
      console.log('tenant', this.tenant)
      console.log('apiKey', this.apiKey)
    },
    setSystemServcieData (data) {
      var systemServiceValue = (data === undefined || data.id === 0) ? '' : `${data.systemCode}:<${data.actionCode}>`
      this.form.setFieldsValue({
        systemService: systemServiceValue
      })
    },
    setTenantApiKeyData (data) {
      var tenantValue = (data.tenant === undefined || data.tenant.id === 0) ? '' : `${data.tenant.name}:<${data.tenant.code}>`
      var apiKeyValue = (data.apiKey === undefined || data.apiKey.id === 0) ? '' : `${data.apiKey.name}:<${data.apiKey.value}>`
      this.form.setFieldsValue({
        tenant: tenantValue,
        apiKey: apiKeyValue
      })
    },
    setServiceSubscription  (data) {
      if (data === undefined ||
        data.systemService === undefined ||
        data.apiKey === undefined || data.apiKey.tenant === undefined
      ) return
      this.setSystemServcieData(data.systemService)
      var tempData = {
        apiKey: data.apiKey,
        tenant: data.apiKey.tenant
      }
      this.setTenantApiKeyData(tempData)
    }
  }
}
</script>
<style scoped>
  .information-card {
    margin-top: 24px;
  }
  .system-component {
    margin-right: 16px;
  }
  .system-component .icon {
    margin-right: 6px;
  }
  .system-component .success {
    margin-right: 6px;
    color: #3da739
  }
  .system-component .error {
    margin-right: 6px;
    color: #d40c0c
  }
  .operation-panel {
    position: 'absolute';
    left: 0;
    bottom: 0;
    width: '100%';
    border-top: '1px solid #e9e9e9';
    padding: '10px 16px';
    background: '#fff';
    text-align: 'right'
  }
</style>
