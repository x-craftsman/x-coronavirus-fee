<template>
  <div>
    <a-form style="margin: 40px auto 0;">
      <result title="操作成功" :is-success="true" description="预计5分钟内启动" style="max-width: 560px;">
        <div class="information">
          <a-row>
            <a-col :sm="8" :xs="24">租户代码</a-col>
            <a-col :sm="16" :xs="24">{{ this.formData.tenantCode }}</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">操作代码：</a-col>
            <a-col :sm="16" :xs="24">{{ this.formData.actionCode }}</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">订阅类型：</a-col>
            <a-col :sm="16" :xs="24">{{ this.subscibeType }}</a-col>
          </a-row>
        </div>
        <div slot="action">
          <a-button @click="toSubscibeList"><a-icon type="rollback" />返回列表</a-button>
          <a-button @click="toSubscibeDetail" type="primary" style="margin-left: 8px">查看明细</a-button>
        </div>
      </result>
    </a-form>
  </div>
</template>

<script>
import { Result } from '@/components'

export default {
  name: 'Step3',
  components: {
    Result
  },
  data () {
    return {
      loading: false
    }
  },
  props: {
    formData: {
      type: Object,
      default: null
    }
  },
  computed: {
    subscibeType () {
      let type = ''
      if (this.formData.stepFlow === 'custom') {
        type = '自定义'
      }
      if (this.formData.stepFlow === 'standard') {
        if (this.formData.mapType === 1) {
          type = `标准 - Json 映射`
        } else if (this.formData.mapType === 2) {
          type = `标准 - Text 映射`
        } else {
          type = `标准 - 未知类型`
        }
      }
      return type
    }
  },
  methods: {
    toSubscibeList () {
      // this.$emit('/system-service/subscription/list')
    },
    toSubscibeDetail () {
      this.$router.push(`/system-service/subscription/detail/${this.formData.subscribeId}`)
    }
  }
}
</script>
<style lang="less" scoped>
  .information {
    line-height: 22px;

    .ant-row:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .money {
    font-family: "Helvetica Neue",sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 14px;
  }
</style>
