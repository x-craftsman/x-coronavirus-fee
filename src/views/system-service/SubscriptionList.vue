<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48" >
          <a-col :md="7" :sm="24">
            <a-form-item label="系统代码">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="租户代码"><a-input-number v-model="queryParam.status" style="width: 100%"/></a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="操作代码"><a-input-number v-model="queryParam.callNo" style="width: 100%"/></a-form-item>
          </a-col>
          <a-col :md="3" :sm="24">
            <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
            <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleRedirect('standard')">标准服务订阅</a-button>
      <a-button type="primary" icon="plus" @click="handleRedirect('custom')">自定义服务订阅</a-button>
      <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      :showPagination="true"
    >
      <span slot="id" slot-scope="text">
        {{ text }}
      </span>
      <span slot="tenantCode" slot-scope="text">
        {{ text }}
      </span>
      <span slot="actionCode" slot-scope="text">
        <!-- <ellipsis :length="10" tooltip>{{ text }}</ellipsis> -->
        {{ text }}
      </span>
      <span slot="systemCode" slot-scope="text">
        {{ text }}
      </span>
      <span slot="status" slot-scope="value">
        <a-badge :status="value | statusFilter('icon')" :text="value | statusFilter('text')" />
      </span>
      <span slot="type" slot-scope="value">
        <a-icon :type="value | typeFilter('icon')"></a-icon>
        {{ value | typeFilter('text') }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleViewDetail(record)">查看明细</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确认删除吗？" @confirm="handleDelete(record)" okText="确认" cancelText="取消">
            <a href="#">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getServiceSubscribers, deleteServiceSubscriber } from '@/api/service-subscribers'
import Notification from '@/utils/notification'

const statusMap = {
  0: {
    icon: 'default',
    text: '禁用'
  },
  1: {
    icon: 'success',
    text: '运行中'
  },
  2: {
    icon: 'warning',
    text: '执行异常'
  },
  3: {
    icon: 'error',
    text: '错误预警'
  }
}

const typeMap = {
  0: {
    icon: 'question-circle',
    text: '未知'
  },
  1: {
    icon: 'setting',
    text: '标准'
  },
  2: {
    icon: 'edit',
    text: '自定义'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      notification: new Notification(this.$notification),
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#订阅编号',
          dataIndex: 'id',
          width: '120px',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '租户代码',
          dataIndex: 'tenantCode',
          scopedSlots: { customRender: 'tenantCode' }
        },
        {
          title: '操作代码',
          dataIndex: 'systemService.actionCode',
          scopedSlots: { customRender: 'actionCode' }
        },
        {
          title: '系统代码',
          dataIndex: 'systemService.systemCode',
          scopedSlots: { customRender: 'systemCode' }
        },
        {
          title: '运行状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '订阅类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        var promise = getServiceSubscribers()
        return promise
          .then(res => {
            var result = {
              data: res.data,
              ...res.pagination
            }
            console.log('result=====>', result)
            return result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  filters: {
    statusFilter (value, type) {
      switch (type) {
        case 'icon':
          return statusMap[value].icon
        case 'text':
          return statusMap[value].text
        default:
          return value
      }
    },
    typeFilter (value, type) {
      switch (type) {
        case 'icon':
          return typeMap[value].icon
        case 'text':
          return typeMap[value].text
        default:
          return value
      }
    }
  },
  created () {},
  methods: {
    handleRedirect (pageAlias, data) {
      var tempStr = pageAlias.toLowerCase()
      if (tempStr !== 'standard' && tempStr !== 'custom') {
        tempStr = 'standard'
      }
      this.$router.push(`/system-service/subscription/subscribe?step-flow=${pageAlias}`)
    },
    handleViewDetail (record) {
      console.log(record)
      // this.$router.push({ path: '/system-service/subscription/detail', query: { id: record.id } })
      this.$router.push({ path: `/system-service/subscription/detail/${record.id}` })
    },
    handleDelete (record) {
      console.log('handleDelete', record)
      const promise = deleteServiceSubscriber(record.id)
      promise.then(res => {
        this.notification.info('删除成功！')
        this.handleOk()
      }).catch(err => {
        this.notification.error('删除失败！', err.message)
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
