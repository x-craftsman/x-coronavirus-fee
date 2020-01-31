<template>
  <div>
    <a-drawer
      title="查看执行日志（明细）"
      :width="720"
      @close="handleClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <div>
        <a-form>
          <a-form-item label="系统代码" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
            <a-input :value="logDetail.systemCode" />
          </a-form-item>
          <a-form-item label="租户代码" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
            <a-input :value="logDetail.tenantCode" />
          </a-form-item>
          <a-form-item label="操作代码" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
            <a-input :value="logDetail.actionCode" />
          </a-form-item>
          <a-form-item label="日志类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
            <a-input :value="logDetail.type" />
          </a-form-item>
          <a-form-item label="日志内容" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-textarea :rows="20" :value="logDetail.content" />
          </a-form-item>
          <br/>
        </a-form>
        <div :style="buttonStyle">
          <a-button :style="{ marginRight: '8px' }" @click="handleClose">取消</a-button>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
// import component.
import Notification from '@/utils/notification'
const buttonStyle = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  borderTop: '1px solid #e9e9e9',
  padding: '10px 16px',
  background: '#fff',
  textAlign: 'right'
}
export default {
  name: 'ExecutionLogDetail',
  components: {},
  data () {
    return {
      visible: false,
      logDetail: {},
      buttonStyle: buttonStyle,
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleClose () {
      this.closeDrawer()
    },
    openDrawer (logDetail) {
      this.logDetail = logDetail
      this.visible = true
    },
    closeDrawer () {
      this.logDetail = {}
      this.visible = false
    }
  }
}
</script>
