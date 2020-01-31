<template>
  <a-form :form="form" style="max-width: 1000px; margin: 40px auto 0;" layout="vertical" >
    <div>
      <a-row>
        <a-col :span="24">
          <a-alert
            :closable="true"
            message="请确保数据源和目标数据的字段正确。"
            style="margin-bottom: 24px;"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" >
          <a-form-item label="" >
            <a-select
              showSearch
              placeholder="选择映射逻辑"
              optionFilterProp="children"
              style="width: 200px"
              v-decorator="['mapType', { rules: [{required: true, message: '请选择映射逻辑'}] }]"
            >
              <a-select-option :value="1">Json 映射</a-select-option>
              <a-select-option :value="2">Text 映射</a-select-option>
            </a-select>
          </a-form-item>
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
      <a-row>
        <a-divider />
        <a-col :span="24">
          <a-form-item :wrapperCol="{span: 24, offset: 10}">
            <a-button @click="prevStep">上一步</a-button>
            <a-button style="margin-left: 8px" :loading="loading" type="primary" @click="submit">提交</a-button>
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
      timer: 0
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
      this.form.setFields({
        mapType: { value: this.formData.mapType },
        sourceData: { value: this.formData.sourceData },
        targetData: { value: this.formData.targetData }
      })
    })
  },
  methods: {
    submit () {
      this.validateFieldsAndGo('submit')
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

</style>
