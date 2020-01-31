<template>
  <a-card :bordered="false">
    <!--搜索框-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="租户代码">
              <a-input v-model="queryParam.code" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="租户名称">
              <a-input v-model="queryParam.name" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleCreate">新建</a-button>
    </div>
    <a-divider></a-divider>
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="tenants"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="id" slot-scope="id">
        # {{ id }}
      </template>
      <template slot="type" slot-scope="text, record">
        {{ record.type | typeFilter }}
      </template>
      <template slot="status" slot-scope="text, record">
        {{ record.status | statusFilter }}
      </template>
      <template slot="operation" slot-scope="operation, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确认删除吗？" @confirm="handleDelete(record)" okText="确认" cancelText="取消">
          <a href="#">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <tenant-detail-view ref="tenantDetailView" @submit="submitCallBack"/>
  </a-card>
</template>

<script>
// import api.
import {
  getTenants as apiGetTenants,
  deleteTenant as apiDeleteTenant
} from '@/api/tenant'
import Notification from '@/utils/notification'
import TenantDetailView from './TenantDetailView'

const columns = [
  {
    title: '#系统Id',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '租户名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '租户代码',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '租户别名',
    dataIndex: 'nickname',
    scopedSlots: { customRender: 'nickname' }
  },
  {
    title: '类型',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '联系人',
    dataIndex: 'contactName',
    scopedSlots: { customRender: 'contactName' }
  },
  {
    title: '联系电话',
    dataIndex: 'contactTel',
    scopedSlots: { customRender: 'contactTel' }
  },
  {
    title: '联系邮箱',
    dataIndex: 'contactEmail',
    scopedSlots: { customRender: 'contactEmail' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    scopedSlots: { customRender: 'operation' }
  }
]
const statusMap = {
  0: '禁用',
  1: '启用'
}
const typeMap = {
  0: '未知类型',
  1: '签约',
  2: '试用',
  3: '遗失'
}

export default {
  name: 'TableList',
  components: {
    TenantDetailView
  },
  data () {
    return {
      queryParam: {},
      columns: columns,
      pagination: {},
      loading: false,
      tenants: [],
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {
    this.fetchData()
  },
  filters: {
    statusFilter: value => statusMap[value],
    typeFilter: value => typeMap[value]
  },
  methods: {
    fetchData (params = {}) {
      console.log('params:', params)
      const promise = apiGetTenants()
      this.loading = true
      promise.then(response => {
        // this.notification.success('修改成功')
        console.log('fetchData:', response)
        this.pagination = response.pagination
        this.tenants = response.data
        this.loading = false
      }).catch(context => {
        this.loading = false
        this.notification.httpError(`加载租户列表数据！`, context.response)
      })
    },
    handleTableChange () {},
    handleDelete (record) {
      const promise = apiDeleteTenant(record.id)
      promise.then(res => {
        this.fetchData()
        this.notification.success('删除成功！')
      }).catch(err => {
        this.notification.error('删除失败！', err)
      })
    },
    handleCreate () {
      this.$refs.tenantDetailView.openDrawer()
    },
    handleEdit (record) {
      console.log('handleEdit', record)
      this.$refs.tenantDetailView.openDrawer(record)
    },
    submitCallBack (tenant) {
      console.log('submitCallBack', tenant)
      this.fetchData()
    }
  }
}
</script>
