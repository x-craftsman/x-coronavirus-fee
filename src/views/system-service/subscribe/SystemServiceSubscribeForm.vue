<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="currentTab">
      <a-step title="填写租户&操作" />
      <a-step title="配置映射逻辑" />
      <a-step title="完成" />
    </a-steps>
    <div class="content">
      <step1 v-if="currentTab === 0" :form-data="form" @nextStep="nextStep"/>
      <step2-standard v-if="currentTab === 1 && form.stepFlow == 'standard'" :form-data="form" @submit="submit" @prevStep="prevStep"/>
      <step2-custom v-if="currentTab === 1 && form.stepFlow == 'custom'" :form-data="form" @nextStep="nextStep" @prevStep="prevStep"/>
      <step3 v-if="currentTab === 2" :form-data="form" @prevStep="prevStep" @finish="finish"/>
    </div>
  </a-card>
</template>

<script>
import Step1 from './BasicInformationStepForm'
import Step2Standard from './StandardMappingLogicalStepForm'
import Step2Custom from './CustomMappingLogicalStepForm'
// import Step3 from './PreviewStepForm'
import Step3 from './CompleteStepForm'
import { createServiceSubscriber } from '@/api/service-subscribers'
import Notification from '@/utils/notification'

export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2Standard,
    Step2Custom,
    Step3
  },
  data () {
    return {
      notification: new Notification(this.$notification),
      description: '【操作步骤】选择租户/操作 ---> 配置用户自定义逻辑 ---> 预览并提交',
      currentTab: 0,
      // form
      form: {
        stepFlow: '',
        mapType: '',
        sourceData: '',
        targetData: '',
        tenant: {},
        apiKey: {},
        systemService: {},
        subscribeId: 0
      }
    }
  },
  mounted () {
    var flow = this.$route.query['step-flow']
    console.log('stepFlow is:', flow)
    this.form.stepFlow = flow
  },
  methods: {
    // handler
    nextStep (stepIndex, formData) {
      // 设置数据
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
      this.saveCurrentForm(stepIndex, formData)
    },
    prevStep (stepIndex, formData) {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
      this.saveCurrentForm(stepIndex, formData)
    },
    finish () {},
    submit (stepIndex, formData) {
      this.saveCurrentForm(stepIndex, formData)
      // 提交订阅信息.
      var sourceFields = this.form.sourceData.split('\n')
      var targetFields = this.form.targetData.split('\n')
      var ruleDetails = []
      for (let i = 0; i < sourceFields.length; i++) {
        ruleDetails.push({
          source: sourceFields[i],
          target: targetFields[i],
          tenantCode: this.form.tenant.code
        })
      }

      var subscriber = {
        actionCode: this.form.systemService.actionCode,
        tenantCode: this.form.tenant.code,
        apiKeyId: this.form.apiKey.id,
        subscriberType: this.form.stepFlow === 'standard' ? 1 : 2,
        state: 0,
        ruleType: this.form.mapType,
        ruleDetails: ruleDetails
      }
      console.log('createServiceSubscriber:', subscriber)
      const promise = createServiceSubscriber(subscriber)
      promise.then(res => {
        this.notification.info('订阅服务成功！')
        console.log('res===>', res)
        this.form.subscribeId = res.id
        this.currentTab += 1
        // this.$router.push('/system-service/subscription/list')
      }).catch(err => {
        this.notification.error('订阅服务失败！', err.response.data.errors[0].message)
        console.log('createServiceSubscriber error:', err)
        console.error('createServiceSubscriber error')
      })
    },
    saveCurrentForm (formIndex, formData) {
      switch (formIndex) {
        case 1:
          this.form.tenant = formData.tenant
          this.form.apiKey = formData.apiKey
          this.form.systemService = formData.systemService
          break
        case 2:
          this.form.mapType = formData.mapType
          this.form.sourceData = formData.sourceData
          this.form.targetData = formData.targetData
          break
      }
    },
    resetFrom () {
      this.form = {}
      this.currentTab = 0
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
