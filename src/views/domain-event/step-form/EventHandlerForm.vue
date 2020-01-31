<template>
  <div>
    <a-form :form="form" >
      <div style="margin: 40px auto 40px 0px;">
        <a-row>
          <a-col :span="2" style="padding-top: 5px;">
            数据映射：
          </a-col>
          <a-col :span="19">
            <a-radio-group
              v-decorator="['mappingType', { rules: [{ required: true, message: '请选择数据映射类型' }] }]"
              @change="handleSelectMappingType"
            >
              <a-radio-button :value="1">Json 映射</a-radio-button>
              <a-radio-button :value="2">Xml 映射</a-radio-button>
              <a-radio-button :value="3">Text 映射</a-radio-button>
              <a-radio-button :value="4">自定义</a-radio-button>
            </a-radio-group>
          </a-col>
        </a-row>
      </div>
      <!-- 自定义逻辑 -->
      <div v-if="selectMappingType === 4">
        <a-row>
          <a-col :span="24">
            <a-alert
              :closable="false"
              message="上传自定义逻辑"
              style="margin-bottom: 24px;"
            />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" >
            <a-form-item label="自定义逻辑：" :label-col="{ span: 4 }" :wrapper-col="{ span: 8 }" >
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                <a-button :style="{ width: '300px' }" > <a-icon type="upload" /> 上传文件 </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="8" >
            <a-form-item :label-col="{ span: 8 }" :wrapper-col="{ span: 4 }" >
              <a-button style="margin-left: 8px" type="primary"><a-icon type="dot-chart" />校验分析</a-button>
            </a-form-item>
          </a-col>
          <a-divider />
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-alert
              :closable="false"
              message="校验分析结果"
              style="margin-bottom: 24px;"
            />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item label="数据库访问组件" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
              <div>
                <a-tag v-for="(option, index) in databaseOptions" :key="index" color="purple">{{ option }}</a-tag>
              </div>
            </a-form-item>
            <a-form-item label="标准服务调用组件" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
              <div>
                <a-tag v-for="(service, index) in stdServiceOptions" :key="index" color="blue">{{ service }}</a-tag>
              </div>
            </a-form-item>
            <a-form-item label="系统标准组件" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
              <span class="system-component" :key="index" v-for="(option, index) in systemComponentOptions">
                <a-icon :class="(option.checked ? 'icon success' : 'icon error')" :type="(option.checked ? 'check' : 'close')"/>
                <span class="item">{{ option.text }}</span>
              </span>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <!-- 标准逻辑 -->
      <div v-if="selectMappingType !== 4">
        <a-row>
          <a-col :span="2" style="padding-top: 5px;">
            服务选择：
          </a-col>
          <a-col :span="8">
            <a-input
              v-decorator="['apiKey', { rules: [{ required: true, message: '请选择ApiKey' }] }]"
              disabled="disabled"
            >
              <a-icon slot="addonBefore" type="key" />
            </a-input>
          </a-col>
          <a-col :span="4" :offset="1">
            <a-button type="primary" icon="swap" @click="showSelectDrawer('tenantApiKey')"></a-button>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-alert
              :closable="true"
              message="请确保数据源和目标数据的字段正确。"
              style="margin: 24px 0px 24px 0px;"
            />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10">
            <a-form-item label="源数据" >
              <a-textarea :rows="20" v-decorator="['sourceData', { initialValue: '', rules: [{required: true, message: '源数据不能为空'}] }]"/>
            </a-form-item>
          </a-col>
          <a-col :span="4">
          </a-col>
          <a-col :span="10">
            <a-form-item label="目标数据" >
              <a-textarea :rows="20" v-decorator="['targetData', { initialValue: '', rules: [{required: true, message: '目标数据不能为空'}] }]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
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
  props: {},
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
      form1: this.$form.createForm(this),
      selectMappingType: 0,
      systemComponentOptions: [
        { text: '消息组件', checked: true },
        { text: '日志组件', checked: true },
        { text: '缓存组件', checked: false }
      ],
      databaseOptions: ['repoUser', 'repoSaleOrder'],
      stdServiceOptions: ['wmsPOService', 'omsPOService', 'amsPOService', 'wmsPOService', 'omsPOService', 'amsPOService', 'wmsPOService', 'omsPOService', 'amsPOService']
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
          this.$emit('nextStep', 3, outputData)
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
          this.$emit('prevStep', 3, outputData)
        }
      })
    },
    handleSelectMappingType (e) {
      this.selectMappingType = e.target.value
    }

  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }
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
</style>
