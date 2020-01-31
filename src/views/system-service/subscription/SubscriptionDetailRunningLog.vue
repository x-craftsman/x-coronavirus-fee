<template>
  <div>
    <!-- 执行日志 -->
    <a-card class="information-card" :bordered="false" title="执行记录">
      <a-form>
        <a-row>
          <a-col :span="10" :offset="0">
            <a-form-item label="选择日期" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-range-picker v-decorator="['rangeDate', { rules: [{ type: 'array', required: true, message: '请选择时间!' }] }]" />
              <a-button type="primary" class="search-btn">查询</a-button>
              <a-button type="default" class="search-btn">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-table
              :columns="columns"
              rowKey="id"
              :dataSource="this.execRecords"
              :pagination="this.pagination"
              :loading="loading"
              @change="handleTableChange"
            >
              <span slot="id" slot-scope="text">
                #{{ text }}
              </span>
              <span slot="status" slot-scope="statusId">
                <a-badge :status="statusId | statusIconFilter" :text="statusId | statusTextFilter" />
              </span>
              <span slot="startTime" slot-scope="date">
                {{ date | dateTimeFilter }} <a-icon type="clock-circle"/>
              </span>
              <span slot="endTime" slot-scope="date">
                {{ date | dateTimeFilter }} <a-icon type="clock-circle"/>
              </span>
              <span slot="operation" slot-scope="text, record">
                <template>
                  <a @click="handleViewLogs(record)">查看日志</a>
                </template>
              </span>
            </a-table>
            <execution-log ref="execLog" />
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>
<script>
import moment from 'moment'
import {
  getServiceSubscriberExecutionRecords as apiGetExecutionRecords
} from '@/api/service-subscribers'
import Notification from '@/utils/notification'
// common compent
import ExecutionLog from './exec-record/ExecutionLogList'
const columns = [
  {
    title: 'No.',
    dataIndex: 'id',
    width: '5%',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '执行状态',
    dataIndex: 'status',
    width: '8%',
    scopedSlots: { customRender: 'status' }
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
    title: '开始时间',
    dataIndex: 'startTime',
    scopedSlots: { customRender: 'startTime' }
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    scopedSlots: { customRender: 'endTime' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
    scopedSlots: { customRender: 'operation' }
  }
]
const statusMap = {
  0: { text: '未知', icon: 'default' },
  1: { text: '成功', icon: 'success' },
  2: { text: '异常', icon: 'warning' },
  3: { text: '失败', icon: 'error' }
}

export default {
  components: {
    ExecutionLog
  },
  props: {
    subscriberId: { type: Number, default: 99999 }
  },
  data () {
    return {
      execRecords: [],
      pagination: {},
      loading: false,
      columns: columns,
      visibleDetail: false,
      logDetail: {},
      notification: new Notification(this.$notification)
    }
  },
  watch: {},
  computed: {},
  filters: {
    dateTimeFilter: value => moment(value).format('YYYY-MM-DD, HH:mm:ss'),
    statusTextFilter: value => statusMap[value].text,
    statusIconFilter: value => statusMap[value].icon
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      // const promise = getServiceSubscriberLogs(this.subscriberId)
      // promise.then(res => {
      //   // this.$message.info('删除成功！')
      //   this.logs = res.data
      //   this.pagination = res.pagination
      // }).catch(() => {})
    },
    feachData () {
      this.loading = true
      const promise = apiGetExecutionRecords(this.subscriberId)
      promise.then(response => {
        console.log('ExecutionRecord - fetchData:', response)
        this.execRecords = response.data
        this.pagination = response.pagination
        this.loading = false
      }).catch(context => {
        this.loading = false
        this.notification.httpError(`加载数据失败！`, context.response)
      })
    },
    handleViewLogs (record) {
      const subscriberId = this.subscriberId
      this.$refs.execLog.openDrawer(subscriberId, record.id)
    }
  },
  created () {},
  mounted () {
    this.feachData()
  }
}
</script>
<style scoped>
  .information-card {
    margin-top: 24px;
  }
  .search-btn {
    margin-left: 10px;
  }
</style>
