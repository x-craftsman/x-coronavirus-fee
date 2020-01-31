<template>
  <div>
    <a-form style="margin: 40px auto 0;max-width:1000px;">
      <div class="information">
        <a-row>
          <a-col :span="24">
            <a-alert
              :closable="true"
              message="请 Review 填写的总体数据。"
              style="margin-bottom: 24px;"
            />
          </a-col>
        </a-row>
        <a-row>
          <a-col :sm="2" :xs="24">租户代码：</a-col>
          <a-col :sm="4" :xs="24" v-text="formData.tenantCode"></a-col>
        </a-row>
        <a-row>
          <a-col :sm="2" :xs="24">操作代码：</a-col>
          <a-col :sm="4" :xs="24" v-text="formData.actionCode"></a-col>
        </a-row>
        <a-row>
          <a-col :sm="10" :xs="24">
            <a-form-item label="原始数据：" >
              <a-textarea :rows="20" :disabled="true" :value="formData.sourceData"/>
            </a-form-item>
          </a-col>
          <a-col :sm="4" :xs="24">
          </a-col>
          <a-col :sm="10" :xs="24">
            <a-form-item label="目标数据：" >
              <a-textarea :rows="20" :disabled="true" :value="formData.targetData"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-divider />
          <a-form-item :wrapperCol="{span: 24, offset: 10}">
            <a-button @click="prevStep">上一步</a-button>
            <a-button style="margin-left: 8px" :loading="loading" type="primary" @click="finish">提交</a-button>
          </a-form-item>
        </a-row>
      </div>
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
  methods: {
    finish () {
      this.$emit('finish')
    },
    prevStep () {
      this.$emit('prevStep')
    }
    // toOrderList () {
    //   this.$router.push('/list/table-list')
    // }
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
