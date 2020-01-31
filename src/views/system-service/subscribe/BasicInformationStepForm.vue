<template>
  <div>
    <a-form :form="form" style="max-width: 600px; margin: 40px auto 0;">
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
            <a-col :span="3" :offset="1">
              <!-- <a-button type="primary" icon="swap"></a-button> -->
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
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="default" @click="toListPage">返回列表</a-button>
        <a-button type="primary" @click="nextStep" style="margin-left: 8px">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc"></div>
  </div>
</template>

<script>
import SystemServcieSelect from '@/views/common/select-component/SystemServcieSelect'
import TenantApiKeySelect from '@/views/common/select-component/TenantApiKeySelect'

export default {
  components: {
    SystemServcieSelect,
    TenantApiKeySelect
  },
  name: 'Step1',
  props: {
    formData: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 设置form数据
      this.form.setFields({
        tenantCode: { value: this.formData.tenantCode },
        actionCode: { value: this.formData.actionCode }
      })
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
      }
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
          this.$emit('nextStep', 1, outputData)
        }
      })
    },
    toListPage () {
      this.$router.push('/system-service/subscription/list')
    },
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
      var systemServiceValue = (data === undefined || data.id === 0) ? '' : `${data.systemCode}:<${data.actionCode}>`
      this.form.setFieldsValue({
        systemService: systemServiceValue
      })
      console.log('systemService', this.systemService)
    },
    handleTenantApiKeySelect (data) {
      this.tenant = data.tenant
      this.apiKey = data.apiKey
      var tenantValue = (data.tenant === undefined || data.tenant.id === 0) ? '' : `${data.tenant.name}:<${data.tenant.code}>`
      var apiKeyValue = (data.apiKey === undefined || data.apiKey.id === 0) ? '' : `${data.apiKey.name}:<${data.apiKey.value}>`
      this.form.setFieldsValue({
        tenant: tenantValue,
        apiKey: apiKeyValue
      })
      console.log('tenant', this.tenant)
      console.log('apiKey', this.apiKey)
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
