<template>
  <a-card class="information-card" :bordered="false" title="标准映射逻辑">
    <a-form>
      <a-form-item label="映射类型" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
        <div>
          <a-icon type="file-text"></a-icon>
          <a-divider type="vertical"/>
          {{ "Json 映射" }}
        </div>
      </a-form-item>
      <a-form-item label="映射逻辑" :label-col="{ span: 3 }" :wrapper-col="{ span: 17 }">
        <div class="system-component" v-for="(detail, index) in this.model.details" :key="detail.id">
          <a-button-group size="small">
            <a-button type="default" icon="edit" @click="showRuleDetail('edit', detail)" />
            <a-popconfirm title="确认删除？" @confirm="handleDelete(detail)" >
              <a-icon slot="icon" type="question-circle-o" style="color: red" />
              <a-button type="dashed" icon="delete" />
            </a-popconfirm>
          </a-button-group>
          <a-divider type="vertical"/>
          <a-tag color="blue">#{{ index + 1 }}</a-tag>
          <a-tag color="blue">{{ detail.source }}</a-tag>
          <a-icon type="arrow-right" :style="{marginRight: '8px', color: '#91D5FF'}" />
          <a-tag color="blue">{{ detail.target }}</a-tag>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
        <a-button @click="showRuleDetail('create')" type="primary">新增映射逻辑<a-icon type="plus"/></a-button>
      </a-form-item>
    </a-form>
    <a-drawer
      title="映射规则明细"
      :width="720"
      @close="handleClose"
      :visible="this.ruleDetailDrawer.setting.visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form layout="vertical">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="源字段：">
              <a-input v-model="ruleDetailDrawer.data.source"/>
              <!-- <a-input
                v-decorator="['name', {
                  rules: [{ required: true, message: 'Please enter user name' }]
                }]"
                placeholder="Please enter user name"
              /> -->
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="目标字段：">
              <a-input v-model="ruleDetailDrawer.data.target"/>
              <!-- <a-input
                v-decorator="['name', {
                  rules: [{ required: true, message: 'Please enter user name' }]
                }]"
                placeholder="Please enter user name"
              /> -->
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="operation-panel">
        <a-button :style="{marginRight: '8px'}" @click="handleClose">取消</a-button>
        <a-button @click="handleSubmit" type="primary">提交</a-button>
      </div>
    </a-drawer>
  </a-card>
</template>
<script>
import Notification from '@/utils/notification'
import { createServiceSubscriberRuleDetail, updateServiceSubscriberRuleDetail, deleteServiceSubscriberRuleDetail } from '@/api/service-subscribers'
export default {
  components: {},
  props: {
    model: {
      type: Object,
      default: () => {
        return {
          details: []
        }
      },
      required: false
    }
  },
  data () {
    return {
      notification: new Notification(this.$notification),
      ruleDetailDrawer: {
        setting: {
          visible: false,
          action: 'create' // create or edit
        },
        data: {
          source: '',
          target: ''
        }
      }
    }
  },
  created () {},
  mounted () {
    console.log('information-card', this.model)
  },
  watch: {},
  computed: {},
  methods: {
    showRuleDetail (action, detail) {
      if (action === 'edit') {
        this.ruleDetailDrawer.data.source = detail.source
        this.ruleDetailDrawer.data.target = detail.target
        this.ruleDetailDrawer.data.id = detail.id
      } else {
        this.ruleDetailDrawer.data.source = ''
        this.ruleDetailDrawer.data.target = ''
      }
      this.ruleDetailDrawer.setting.visible = true
      this.ruleDetailDrawer.setting.action = action
    },
    handleClose () {
      this.ruleDetailDrawer.setting.visible = false
    },
    handleSubmit () {
      console.log('handleSubmit - model', this.ruleDetailDrawer)
      const action = this.ruleDetailDrawer.setting.action
      const data = this.ruleDetailDrawer.data
      const { id: ruleId, subscriberId } = this.model
      switch (action) {
        case 'create':
          this.createRuleDetail(subscriberId, ruleId, data)
          break
        case 'edit':
          this.updateRuleDetail(subscriberId, ruleId, data)
          break
        default:
          console.error(`未知的操作类型${action}`)
          break
      }
    },
    createRuleDetail (subscriberId, ruleId, entity) {
      const promise = createServiceSubscriberRuleDetail(subscriberId, ruleId, entity)
      promise.then(data => {
        this.notification.success('创建成功')
        this.model.details.push(data)
        this.handleClose()
      }).catch(context => {
        this.notification.httpError(`创建失败！`, context.response)
      })
    },
    updateRuleDetail (subscriberId, ruleId, entity) {
      const promise = updateServiceSubscriberRuleDetail(subscriberId, ruleId, entity.id, entity)
      promise.then(data => {
        this.notification.success('修改成功')
        for (var i = 0; i < this.model.details.length; i++) {
          var detail = this.model.details[i]
          if (detail.id === entity.id) {
            detail.source = entity.source
            detail.target = entity.target
            break
          }
        }
        this.handleClose()
      }).catch(context => {
        this.notification.httpError(`修改失败！`, context.response)
      })
    },
    handleDelete (entity) {
      const { id: detailId } = entity
      const { id: ruleId, subscriberId } = this.model
      const promise = deleteServiceSubscriberRuleDetail(subscriberId, ruleId, detailId)
      var details = this.model.details
      promise.then(data => {
        this.notification.success('删除成功')
        for (var i = 0; i < details.length; i++) {
          var detail = details[i]
          if (detail.id === detailId) {
            this.model.details.splice(i, 1)
            break
          }
        }
        this.handleClose()
      }).catch(context => {
        this.notification.httpError(`创建失败！`, context.response)
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
  .operation-panel {
    position: 'absolute';
    left: 0;
    bottom: 0;
    width: '100%';
    border-top: '1px solid #e9e9e9';
    padding: '10px 16px';
    background: '#fff';
    text-align: 'right'
  }
</style>
