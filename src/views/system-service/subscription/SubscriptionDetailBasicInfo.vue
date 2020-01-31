<template>
  <div>
    <subscription-service-info :model="model"/>
    <std-mapping-logic :model="model.mappingRule" v-if="this.model.mappingRule.type === 1"/>
    <a-card class="information-card" :bordered="false" title="订阅处理程序分析结果" v-if="this.model.mappingRule.type === 2">
      <a-form>
        <a-form-item label="数据库访问组件" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
          <div>
            <a-tag v-for="(option, index) in databaseOptions" :key="index" color="purple">{{ option }}</a-tag>
          </div>
        </a-form-item>
        <a-form-item label="标准服务调用组件" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
          <div>
            <a-tag v-for="(service, index) in stdServiceOptions" :key="index" color="purple">
              {{ service }}
            </a-tag>
          </div>
        </a-form-item>
        <a-form-item label="系统标准组件" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
          <span class="system-component" :key="index" v-for="(option, index) in systemComponentOptions">
            <a-icon :class="(option.checked ? 'icon success' : 'icon error')" :type="(option.checked ? 'check' : 'close')"/>
            <span class="item">{{ option.text }}</span>
          </span>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
          <a-button type="primary">编辑自定义逻辑<a-icon type="right"/></a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script>
import StdMappingLogic from './basic-info/StandardMappingLogic'
import SubscriptionServiceInfo from './basic-info/SubscriptionServiceInfo'

export default {
  components: {
    StdMappingLogic,
    SubscriptionServiceInfo
  },
  props: {
    model: {
      type: Object,
      default: null,
      required: false
    }
  },
  data () {
    return {
      systemComponentOptions: [
        { text: '消息组件', checked: true },
        { text: '日志组件', checked: true },
        { text: '缓存组件', checked: false }
      ],
      databaseOptions: ['repoUser', 'repoSaleOrder'],
      stdServiceOptions: ['wmsPOService', 'omsPOService', 'amsPOService', 'wmsPOService', 'omsPOService', 'amsPOService', 'wmsPOService', 'omsPOService', 'amsPOService'],
      subscriberDetail: {}
    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    handleSubmit () {
      const { formStandardService: { validateFields } } = this
      // this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('information-card form', values)
          // const promise = createInternalWebApiService(values)
          // if (promise == null) {
          //   this.confirmLoading = false
          //   this.$message.error('服务地址不正确！')
          // }
          // promise.then(res => {
          //   this.$message.info('创建成功')
          //   console.log('res===>', res)
          //   this.visible = false
          //   this.confirmLoading = false
          //   this.$emit('ok', values)
          // }).catch(() => {
          //   this.$message.error('创建失败！')
          //   this.visible = false
          //   this.confirmLoading = false
          //   console.error('createInternalWebApiService error')
          // })
        } else {
          // this.confirmLoading = false
        }
      })
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
</style>
