<template>
  <a-card :bordered="false">
    <!--搜索框-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="租户代码">
              <a-input v-model="queryParam.tenantCode" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="租户名称">
              <a-input v-model="queryParam.tenantName" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="Api名称">
              <a-input v-model="queryParam.FileServerName" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
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
      :dataSource="datas"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="id" slot-scope="id">
        # {{ id }}
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
// import {
//   getTenants as apiGetTenants,
//   deleteTenant as apiDeleteTenant
// } from '@/api/tenant'
import Notification from '@/utils/notification'
// import TenantDetailView from './TenantDetailView'

const columns = [
  {
    title: '#系统Id',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: 'Web Api 地址',
    dataIndex: 'url',
    scopedSlots: { customRender: 'url' }
  },
  {
    title: 'Http Method',
    dataIndex: 'httpMethod',
    scopedSlots: { customRender: 'httpMethod' }
  },
  {
    title: '认证方式',
    dataIndex: 'authType',
    scopedSlots: { customRender: 'authType' }
  },
  {
    title: '加密方式',
    dataIndex: 'encryptionScheme',
    scopedSlots: { customRender: 'encryptionScheme' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    scopedSlots: { customRender: 'remark' }
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

export default {
  name: 'TableList',
  components: {},
  // components: {
  //   TenantDetailView
  // },
  data () {
    return {
      queryParam: {},
      columns: columns,
      pagination: {},
      loading: false,
      datas: [],
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {
    this.fetchData()
  },
  filters: {
    statusFilter: value => statusMap[value]
  },
  methods: {
    fetchData (params = {}) {
      console.log('params:', params)
      this.datas = []
      for (var i = 0; i < 50; i++) {
        this.datas.push({
          id: i,
          url: `https://abc.com/order/${i}`,
          httpMethod: (i % 2 === 0) ? 'POST' : 'GET',
          authType: (i % 2 === 0) ? 'OAuth' : '自定义',
          encryptionScheme: 'SHA256',
          status: i % 2,
          remark: '这里是备注'
        })
      }
      // const promise = apiGetTenants()
      // this.loading = true
      // promise.then(response => {
      //   console.log('fetchData:', response)
      //   this.pagination = response.pagination
      //   this.datas = response.data
      //   this.loading = false
      // }).catch(context => {
      //   this.loading = false
      //   this.notification.httpError(`加载列表数据失败！`, context.response)
      // })
    },
    handleTableChange () {},
    handleDelete (record) {
      // const promise = apiDeleteTenant(record.id)
      // promise.then(res => {
      //   this.fetchData()
      //   this.notification.success('删除成功！')
      // }).catch(err => {
      //   this.notification.error('删除失败！', err)
      // })
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
