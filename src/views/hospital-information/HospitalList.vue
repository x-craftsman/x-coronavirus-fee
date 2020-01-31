<template>
  <a-card :bordered="false">
    <!--搜索框-->
    <div class="table-page-search-wrapper">
      <a-form :form="form" layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="医院名称">
              <a-input v-decorator="['name', { initialValue: '', rules: [{required: false}] }]"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="城市">
              <a-input v-decorator="['city', { initialValue: '', rules: [{required: false}] }]"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="handleSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleCreate">新建</a-button>
    </div> -->
    <a-divider></a-divider>
    <a-table
      ref="table"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="hospitals"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="id" slot-scope="id">
        # {{ id }}
      </template>
      <template slot="operation" slot-scope="operation, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确认删除吗？" @confirm="handleDelete(record)" okText="确认" cancelText="取消">
          <a href="#">查看</a>
        </a-popconfirm>
      </template>
    </a-table>
    <hospital-detail ref="hospitalDetail" @submit="submitCallBack"/>
  </a-card>
</template>

<script>
// import api.
import {
  getHospitals as apiGetHospitals,
  deleteHospital as apiDeleteHospital
} from '@/api/hospital'
import Notification from '@/utils/notification'
import HospitalDetail from './HospitalDetail'

const columns = [
  {
    title: '#Id',
    dataIndex: 'id',
    width: '80px',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '医院名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '城市',
    dataIndex: 'city',
    width: '80px',
    scopedSlots: { customRender: 'city' }
  },
  {
    title: '医护人员数量',
    dataIndex: 'staffCount',
    scopedSlots: { customRender: 'staffCount' }
  },
  {
    title: '邮寄地址',
    dataIndex: 'address',
    scopedSlots: { customRender: 'address' }
  },
  // {
  //   title: '是否校验医院/医师资格',
  //   dataIndex: 'isVerifyQualification',
  //   scopedSlots: { customRender: 'isVerifyQualification' }
  // },
  // {
  //   title: '医院资格校验内容',
  //   dataIndex: 'verifyContent',
  //   scopedSlots: { customRender: 'verifyContent' }
  // },
  {
    title: '接收物资',
    dataIndex: 'canReceive',
    scopedSlots: { customRender: 'canReceive' }
  },
  // {
  //   title: '特殊情况备注',
  //   dataIndex: 'remark',
  //   scopedSlots: { customRender: 'remark' }
  // },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  name: 'TableList',
  components: {
    HospitalDetail
  },
  data () {
    return {
      queryParam: {},
      columns: columns,
      pagination: {},
      loading: false,
      hospitals: [],
      form: this.$form.createForm(this),
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData (params = {}) {
      console.log('params:', params)
      var promise = apiGetHospitals(params)
      this.loading = true
      promise.then(response => {
        // this.notification.success('修改成功')
        console.log('fetchData:', response)
        this.pagination = response.pagination
        this.hospitals = response.data
        this.loading = false
      }).catch(context => {
        this.loading = false
        this.notification.httpError(`加载租户列表数据！`, context.response)
      })
    },
    handleTableChange () {},
    handleSearch () {
      // console.log('inputCity', this.queryParam)
      this.form.validateFields((err, values) => {
        console.log('err', err)
        console.log('values', values)
        this.fetchData(values)
      })
    },
    handleDelete (record) {
      const promise = apiDeleteHospital(record.id)
      promise.then(res => {
        this.fetchData()
        this.notification.success('删除成功！')
      }).catch(err => {
        this.notification.error('删除失败！', err)
      })
    },
    handleCreate () {
      this.$refs.hospitalDetail.openDrawer()
    },
    handleEdit (record) {
      console.log('handleEdit', record)
      this.$refs.hospitalDetail.openDrawer(record)
    },
    submitCallBack (tenant) {
      console.log('submitCallBack', tenant)
      this.fetchData()
    }
  }
}
</script>
