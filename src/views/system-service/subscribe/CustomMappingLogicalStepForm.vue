<template>
  <a-form :form="form" style="max-width: 1000px; margin: 40px auto 0;" layout="horizontal">
    <div>
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
              name="formFile"
              :multiple="false"
              action="http://localhost:31634/api/custom-code/upload"
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
      <a-row>
        <a-divider />
        <a-col :span="24">
          <a-form-item :wrapperCol="{span: 24, offset: 10}">
            <a-button @click="prevStep">上一步</a-button>
            <a-button style="margin-left: 8px" :loading="loading" type="primary" @click="nextStep">下一步</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </div>
  </a-form>
</template>

<script>
export default {
  name: 'Step2',
  data () {
    return {
      labelCol: { lg: { span: 12 }, sm: { span: 12 } },
      wrapperCol: { lg: { span: 12 }, sm: { span: 20 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0,
      systemComponentOptions: [
        { text: '消息组件', checked: true },
        { text: '日志组件', checked: true },
        { text: '缓存组件', checked: false }
      ],
      databaseOptions: ['repoUser', 'repoSaleOrder'],
      stdServiceOptions: ['wmsPOService', 'omsPOService', 'amsPOService', 'wmsPOService', 'omsPOService', 'amsPOService', 'wmsPOService', 'omsPOService', 'amsPOService']
    }
  },
  props: {
    formData: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 设置form数据
      // this.form.setFields({
      //   mapType: { value: this.formData.mapType },
      //   sourceData: { value: this.formData.sourceData },
      //   targetData: { value: this.formData.targetData }
      // })
    })
  },
  methods: {
    nextStep () {
      this.validateFieldsAndGo('nextStep')
    },
    prevStep () {
      this.validateFieldsAndGo('prevStep')
    },
    validateFieldsAndGo (eventName) {
      const that = this
      const { form: { validateFields } } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          // console.log('表单 values', values)
          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit(eventName, 2, values)
          }, 500)
        } else {
          that.loading = false
        }
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
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
