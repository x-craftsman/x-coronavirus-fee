<template>
  <div>
    <a-drawer
      title="查看执行日志"
      :width="1024"
      @close="handleClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <div>
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="datas"
          :loading="loading"
          :pagination="false"
          bordered
        >
          <template slot="id" slot-scope="id">
            # {{ id }}
          </template>
          <span slot="type" slot-scope="statusId">
            <a-badge :status="statusId | statusIconFilter" :text="statusId | statusTextFilter" />
          </span>
          <template slot="operation" slot-scope="operation, record">
            <a @click="handleViewDetail(record)">查看</a>
          </template>
        </a-table>
        <execution-log-detail ref="execLogDetail"/>
      </div>
      <div :style="buttonStyle">
        <a-button :style="{ marginRight: '8px' }" @click="handleClose">取消</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
// import api.
import {
  getServiceSubscriberExecutionLogs as apiGetExecutionLogs
} from '@/api/service-subscribers'
// import component.
import ExecutionLogDetail from './ExecutionLogDetail'
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
const columns = [
  {
    title: 'No.',
    dataIndex: 'id',
    width: '5%',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '系统代码',
    dataIndex: 'systemCode',
    width: '10%',
    scopedSlots: { customRender: 'systemCode' }
  },
  {
    title: '租户代码',
    dataIndex: 'tenantCode',
    width: '15%',
    scopedSlots: { customRender: 'tenantCode' }
  },
  {
    title: '操作代码',
    dataIndex: 'actionCode',
    width: '15%',
    scopedSlots: { customRender: 'actionCode' }
  },
  {
    title: '日志类型',
    dataIndex: 'type',
    width: '15%',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '内容',
    dataIndex: 'content',
    scopedSlots: { customRender: 'content' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
    scopedSlots: { customRender: 'operation' }
  }
]

const statusMap = {
  0: { text: 'Debug', icon: 'default' },
  1: { text: 'Info', icon: 'success' },
  2: { text: 'Warning', icon: 'warning' },
  3: { text: 'Error', icon: 'error' }
}
export default {
  name: 'ExecutionLogList',
  components: {
    ExecutionLogDetail
  },
  data () {
    return {
      subscriberId: { type: Number, default: 0 },
      recordId: { type: Number, default: 0 },
      loading: false,
      visible: false,
      columns: columns,
      datas: [],
      notification: new Notification(this.$notification),
      buttonStyle: buttonStyle
    }
  },
  created () {},
  mounted () {
    if (this.visible === true) {
      this.fetchData()
    }
  },
  filters: {
    statusTextFilter: value => statusMap[value].text,
    statusIconFilter: value => statusMap[value].icon
  },
  methods: {
    fetchData () {
      const promise = apiGetExecutionLogs(this.subscriberId, this.recordId)
      this.loading = true
      promise.then(response => {
        this.datas = response.data
        this.loading = false
      }).catch(context => {
        this.loading = false
        this.notification.httpError(`加载列表数据失败！`, context.response)
      })
    },
    handleClose () {
      this.closeDrawer()
    },
    openDrawer (subscriberId, recordId) {
      this.subscriberId = subscriberId
      this.recordId = recordId
      this.visible = true
      this.$nextTick(() => {
        this.fetchData()
      })
    },
    closeDrawer () {
      this.datas = []
      this.visible = false
    },
    handleViewDetail (record) {
      this.$refs.execLogDetail.openDrawer(record)
    }
  }
}
</script>
