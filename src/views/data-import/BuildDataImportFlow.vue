<template>
  <a-card :bordered="false">
    <a-row>
      <a-col :span="22" :offset="1">
        <a-steps size="default" :current="(this.currentTab - 1)">
          <a-step title="源处理程序" description="选择导入数据处理程序" />
          <a-step title="目标处理程序" description="选择数据导入对应服务" />
          <a-step title="配置映射逻辑" description="支持多种模式配置" />
          <a-step title="测试导入流程" description="验证处理程序可用性" />
          <a-step title="完成" description="" />
        </a-steps>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <!-- <a-divider orientation="left">
          <a-icon type="setting" theme="filled" :spin="false" :style="{ color: '#1890ff'}"></a-icon>
        </a-divider> -->
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="16" :offset="4">
        <div class="content">
          <step1 v-if="this.currentTab === 1" @nextStep="nextStep" @prevStep="prevStep"/>
          <step2 v-if="this.currentTab === 2" @nextStep="nextStep" @prevStep="prevStep"/>
          <step3 v-if="this.currentTab === 3" @nextStep="nextStep" @prevStep="prevStep"/>
          <step4 v-if="this.currentTab === 4" @nextStep="nextStep" @prevStep="prevStep"/>
          <step5 v-if="this.currentTab === 5" @nextStep="nextStep" @prevStep="prevStep"/>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import Step1 from './step-form/DataSourceHandlerForm'
import Step2 from './step-form/DataTargetHandlerForm'
import Step3 from './step-form/DataMappingLogicForm'
import Step4 from './step-form/TestWorkflowForm'
import Step5 from './step-form/CompleteStepForm'
// import Step2Custom from './CustomMappingLogicalStepForm'
// import Step3 from './PreviewStepForm'
// import Step3 from './CompleteStepForm'
// import { createServiceSubscriber } from '@/api/service-subscribers'
// import Notification from '@/utils/notification'

export default {
  name: 'BuildDataImportFlow',
  components: {
    Step1, Step2, Step3, Step4, Step5
  },
  data () {
    return {
      notification: new Notification(this.$notification),
      description: '【操作步骤】选择租户/操作 ---> 配置用户自定义逻辑 ---> 预览并提交',
      currentTab: 1
      // form
      // form: {
      //   stepFlow: '',
      //   mapType: '',
      //   sourceData: '',
      //   targetData: '',
      //   tenant: {},
      //   apiKey: {},
      //   systemService: {},
      //   subscribeId: 0
      // }
    }
  },
  mounted () {
    // var flow = this.$route.query['step-flow']
    // console.log('stepFlow is:', flow)
    // this.form.stepFlow = flow
  },
  methods: {
    // handler
    nextStep (stepIndex, formData) {
      // 设置数据
      console.log('this.currentTab', this.currentTab)
      if (this.currentTab < 5) {
        this.currentTab += 1
      }
      // this.saveCurrentForm(stepIndex, formData)
    },
    prevStep (stepIndex, formData) {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
      // this.saveCurrentForm(stepIndex, formData)
    },
    finish () {},
    submit (stepIndex, formData) {
      // this.saveCurrentForm(stepIndex, formData)
      // // 提交订阅信息.
      // var sourceFields = this.form.sourceData.split('\n')
      // var targetFields = this.form.targetData.split('\n')
      // var ruleDetails = []
      // for (let i = 0; i < sourceFields.length; i++) {
      //   ruleDetails.push({
      //     source: sourceFields[i],
      //     target: targetFields[i],
      //     tenantCode: this.form.tenant.code
      //   })
      // }

      // var subscriber = {
      //   actionCode: this.form.systemService.actionCode,
      //   tenantCode: this.form.tenant.code,
      //   apiKeyId: this.form.apiKey.id,
      //   subscriberType: this.form.stepFlow === 'standard' ? 1 : 2,
      //   state: 0,
      //   ruleType: this.form.mapType,
      //   ruleDetails: ruleDetails
      // }
      // console.log('createServiceSubscriber:', subscriber)
      // const promise = createServiceSubscriber(subscriber)
      // promise.then(res => {
      //   this.notification.info('订阅服务成功！')
      //   console.log('res===>', res)
      //   this.form.subscribeId = res.id
      //   this.currentTab += 1
      //   // this.$router.push('/system-service/subscription/list')
      // }).catch(err => {
      //   this.notification.error('订阅服务失败！', err.response.data.errors[0].message)
      //   console.log('createServiceSubscriber error:', err)
      //   console.error('createServiceSubscriber error')
      // })
    },
    saveCurrentForm (formIndex, formData) {
      // switch (formIndex) {
      //   case 1:
      //     this.form.tenant = formData.tenant
      //     this.form.apiKey = formData.apiKey
      //     this.form.systemService = formData.systemService
      //     break
      //   case 2:
      //     this.form.mapType = formData.mapType
      //     this.form.sourceData = formData.sourceData
      //     this.form.targetData = formData.targetData
      //     break
      // }
    },
    resetFrom () {
      // this.form = {}
      // this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
