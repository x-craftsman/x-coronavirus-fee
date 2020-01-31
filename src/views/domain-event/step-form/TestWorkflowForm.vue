<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-alert :closable="false" message="请确保数据源和目标数据的字段正确。" style="margin: 24px 0 24px 0;"/>
      </a-col>
    </a-row>
    <a-row style="margin: 24px 0 24px 0;">
      <a-col :span="24">
        <a-button type="primary" @click="handleStartTestProcess"><a-icon type="dot-chart" />测试配置流程</a-button>
      </a-col>
    </a-row>
    <!-- <a-row>
      <a-col :span="24">
        <a-progress :percent="30" />
      </a-col>
    </a-row> -->
    <a-row>
      <a-col :span="5" :offset="1">
        <a-steps direction="vertical" progressDot size="small">
          <a-step
            v-for="(data, i) in this.testSteps"
            :key="`test-${i}-${data.status}`"
            :status="data.status"
            :title="data.title"
          />
          <!-- wait , process , finish  error-->
          <!-- <a-step status="finish" title="获取导入数据"></a-step>
          <a-step status="finish" title="导入数据分析"></a-step>
          <a-step status="finish" title="生成单据处理消息"></a-step>
          <a-step status="process" title="导入数据"></a-step>
          <a-step status="wait" title="处理导入结果"></a-step>
          <a-step status="wait" title="完成"></a-step> -->
        </a-steps>
      </a-col>
      <a-col :span="18">
        <div class="logs">
          <!-- orange, pink, red, green, cyan, blue, purple -->
          <ul>
            <li v-for="(data, i) in this.testMessages" :key="`test-${i}`">
              <a-tag :color="data.color">{{ data.title }}</a-tag>
              <a-tag :color="data.color">{{ data.message }}</a-tag>
            </li>
            <!-- <li>
              <a-tag color="blue">info</a-tag>
              <a-tag color="blue">获取数据导入信息成功。</a-tag>
            </li>
            <li>
              <a-tag color="blue">info</a-tag>
              <a-tag color="blue">数据分析完毕，文件中包含132,435条单据信息。</a-tag>
            </li>
            <li>
              <a-tag color="orange">warning</a-tag>
              <a-tag color="orange">单据 {#123456789} 包装信息不完整。可能会导致处理失败。</a-tag>
            </li>
            <li>
              <a-tag color="blue">info</a-tag>
              <a-tag color="blue">开始生成单据处理消息：已经成功推送 3 条，共 132,435 条</a-tag>
            </li>
            <li>
              <a-tag color="red">error</a-tag>
              <a-tag color="red">单据 {#123456789} 包装信息不完整，无法生成单据。请人工处理... ...</a-tag>
            </li>
            <li>
              <a-icon type="sync" spin style="color: #1890FF;margin-right: 5px"/>
              <a-tag color="purple">process</a-tag>
              <a-tag color="purple">正在生成处理结果</a-tag>
            </li> -->
          </ul>
        </div>
      </a-col>
    </a-row>
    <a-divider />
    <a-row>
      <a-col :span="24">
        <a-row>
          <a-col :span="10" :offset="10">
            <a-button type="default" @click="prevStep">上一步</a-button>
            <a-button type="primary" @click="nextStep" style="margin-left: 8px">下一步</a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import SystemServcieSelect from '@/views/common/select-component/SystemServcieSelect'
// import TenantApiKeySelect from '@/views/common/select-component/TenantApiKeySelect'
const messages = [
  { color: 'blue', title: 'info', message: '获取数据导入信息成功。' },
  { color: 'blue', title: 'info', message: '数据分析完毕，文件中包含132,435条单据信息。' },
  { color: 'orange', title: 'warning', message: '单据 {#123456789} 包装信息不完整。可能会导致处理失败。' },
  { color: 'blue', title: 'info', message: '开始生成单据处理消息：已经成功推送 3 条，共 132,435 条。' },
  { color: 'red', title: 'error', message: '单据 {#123456789} 包装信息不完整，无法生成单据。请人工处理... ...' },
  { color: 'purple', title: 'process', message: '正在生成处理结果。' }
]

const steps = [
  { status: 'process', title: '获取导入数据' },
  { status: 'wait', title: '导入数据分析' },
  { status: 'wait', title: '生成单据处理消息' },
  { status: 'wait', title: '导入数据' },
  { status: 'wait', title: '处理导入结果' },
  { status: 'wait', title: '完成' }
]
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
      testSteps: [],
      testMessages: [],
      currentStep: 1
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
          this.$emit('nextStep', 4, outputData)
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
          this.$emit('prevStep', 4, outputData)
        }
      })
    },
    handleSelectMappingType (e) {
      this.selectMappingType = e.target.value
    },
    handleStartTestProcess () {
      console.log('handleStartTestProcess')
      if (this.currentStep > 6) {
        return
      }
      this.mockChange(this.currentStep++)
      setTimeout(this.handleStartTestProcess, 1000)
    },
    mockChange (count) {
      var tempSteps = []
      for (let i = 0; i < steps.length; i++) {
        tempSteps.push({
          title: steps[i].title,
          status: 'wait'
        })
      }
      this.testSteps = tempSteps
      this.testMessages = []
      for (let i = 0; i < count; i++) {
        if (i > 0) this.testSteps[i - 1].status = 'finish'
        this.testSteps[i].status = 'process'
        this.testMessages.push(messages[i])
      }
      if (count === 6) this.testSteps[count - 1].status = 'finish'
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
  // .logs {
  //   max-height: 100px;
  // }
  ul li {
    list-style: none;
    margin: 5px 0px 0px 0px;
  }
</style>
