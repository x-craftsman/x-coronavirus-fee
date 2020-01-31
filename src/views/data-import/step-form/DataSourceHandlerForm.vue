<template>
  <div>
    <a-form :form="form" style="max-width: 600px; margin: 40px auto 0;min-height: 350px;">
      <a-form-item label="导入处理程序" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-radio-group
          v-decorator="['handlerType', { rules: [{ required: true, message: '请选择导入处理程序' }] }]"
          @change="handleProgramTypeChange"
        >
          <a-radio-button :value="1">文件服务器</a-radio-button>
          <a-radio-button :value="2">Web Api调用</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <!-- fileServer -->
      <div id="fileServer" v-if="this.programTypeIndex === 1">
        <a-form-item label="文件传输协议" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <a-row>
              <a-col :span="20">
                <a-select
                  v-decorator="['protocol', { rules: [{ required: true, message: '请选择文件传输协议' }] }]"
                  placeholder="请选择文件传输协议"
                >
                  <a-select-option value="ftp">FTP-文件传输协议</a-select-option>
                  <a-select-option value="sftp">SFTP-SSH 文件传输协议</a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
        <a-form-item label="主机地址" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <a-row>
              <a-col :span="20">
                <a-input
                  v-decorator="['hostAddress', { rules: [{ required: true, message: '请填写主机地址' }] }]"
                  placeholder="主机地址+端口。 例如：ftp://192.168.100.100:806"
                >
                  <a-icon slot="addonBefore" type="home" />
                </a-input>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
        <a-form-item label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <a-row>
              <a-col :span="20">
                <a-input v-decorator="['userName', { rules: [{ required: true, message: '请填写用户名' }] }]">
                  <a-icon slot="addonBefore" type="user" />
                </a-input>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
        <a-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <a-row>
              <a-col :span="20">
                <a-input type="password" v-decorator="['password', { rules: [{ required: true, message: '请填写密码' }] }]">
                  <a-icon slot="addonBefore" type="key" />
                </a-input>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
        <a-form-item label="文件路径" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <a-row>
              <a-col :span="20">
                <a-input v-decorator="['filePath', { rules: [{ required: true, message: '请填写密码' }] }]">
                  <a-icon slot="addonBefore" type="paper-clip" />
                </a-input>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
      </div>
      <!-- webApi -->
      <div id="webApi" v-if="this.programTypeIndex === 2">
        <a-form-item label="服务地址" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <a-row>
              <a-col :span="20">
                <a-input
                  v-decorator="['curl', { rules: [{ required: true, message: '请填写服务地址' }] }]"
                  placeholder="例如：https://192.168.100.100:8080/abc"
                >
                  <a-icon slot="addonBefore" type="home" />
                </a-input>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
        <a-form-item label="认证方式" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <a-row>
              <a-col :span="20">
                <a-select
                  v-decorator="['authType', { rules: [{ required: true, message: '请选择认证方式' }] }]"
                  placeholder="请选择认证方式"
                >
                  <a-select-option value="oauth">OAuth 2.0</a-select-option>
                  <a-select-option value="saml">SAML</a-select-option>
                  <a-select-option value="custom">自定义</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="3" :offset="1">
                <a-button type="primary" icon="swap"></a-button>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
        <a-form-item label="加密方式" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <a-row>
              <a-col :span="20">
                <a-select
                  v-decorator="['encryptionType', { rules: [{ required: true, message: '请选择加密方式' }] }]"
                  placeholder="请选择加密方式"
                >
                  <a-select-option value="1">Base64</a-select-option>
                  <a-select-option value="2">数字签名</a-select-option>
                  <a-select-option value="3">MD5,SHA1,SHA512</a-select-option>
                  <a-select-option value="4">DES,AES</a-select-option>
                  <a-select-option value="5">自定义</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="3" :offset="1">
                <a-button type="primary" icon="swap"></a-button>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
      </div>
    </a-form>
    <a-divider />
    <a-row>
      <a-col :span="10" :offset="10">
        <a-button type="default" @click="toListPage"><a-icon type="rollback" />返回列表</a-button>
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
      this.form.setFields({
        handlerType: { value: this.programTypeIndex }
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
      programTypeIndex: 1
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
      this.$router.push('/data-import/list')
    },
    handleProgramTypeChange (e) {
      console.log(`checked = ${e.target.value}`)
      this.programTypeIndex = e.target.value
    }
  }
}
</script>

<style lang="less" scoped>
</style>
