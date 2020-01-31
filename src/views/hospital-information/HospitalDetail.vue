<template>
  <div>
    <a-drawer
      :title="((setting.action !== 'edit') ? '创建' : '编辑') + '医院信息'"
      :width="800"
      @close="handleClose"
      :visible="setting.visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="tenantForm" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="医院名称">
              <a-input
                v-decorator="['name', { rules: [{ required: true, message: '请输入医院名称' }] }]"
                placeholder="请输入医院名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所在城市">
              <a-input
                v-decorator="['city', { rules: [{ required: true, message: '请输入所在城市' }] }]"
                placeholder="请输入所在城市"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="医护人员数量">
              <a-input
                v-decorator="['staffCount', { rules: [{ required: true, message: '请输入医护人员数量' }] }]"
                placeholder="请输入医护人员数量"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否接收物资">
              <a-input
                v-decorator="['canReceive', { rules: [{ required: true, message: '请输入接收物资' }] }]"
                placeholder="请输入接收物资"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="邮寄地址">
              <a-textarea
                v-decorator="['address', { rules: [{ required: true, message: '请输入邮寄地址' }] }]"
                placeholder="请输入邮寄地址"
                :row="3"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div v-if="this.setting.action === 'edit'">
        <a-table
          :columns="columns"
          :rowKey="record => record.name"
          :dataSource="medicalSupplies"
          :pagination="false"
          :loading="loading"
          bordered
        >
          <template slot="id" slot-scope="id">
            # {{ id }}
          </template>
          <template slot="operation" slot-scope="operation, record">
            <a @click="showApiKeyDrawer(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除吗？" @confirm="handleDeleteApiKey(record)" okText="确认" cancelText="取消">
              <a href="#">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
        <a-button type="primary" icon="plus" :style="{ marginTop: '10px' }" @click="showApiKeyDrawer()">添加物资需求</a-button>
        <!-- <api-key-detail ref="apiKeyDrawer" @submit="handleSubmitApiKey"/> -->
      </div>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="handleClose">取消</a-button>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
// import api.
import {
  // createTenant as apiCreateTenant,
  // updateTenant as apiUpdateTenant,
  getHospitalMedicalSupplies as apiGetHospitalMedicalSupplies
  // deleteTenantApiKey as apiDeleteTenantApiKey
} from '@/api/hospital'
// import component.
// import ApiKeyDetail from './TenantApiKeyDetail'
import Notification from '@/utils/notification'

const columns = [
  // {
  //   title: '#系统Id',
  //   dataIndex: 'id',
  //   scopedSlots: { customRender: 'id' }
  // },
  {
    title: '物资名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '物资数量',
    dataIndex: 'count',
    scopedSlots: { customRender: 'count' }
  },
  {
    title: '物资单位',
    dataIndex: 'unit',
    scopedSlots: { customRender: 'unit' }
  },
  {
    title: '优先级',
    dataIndex: 'level',
    scopedSlots: { customRender: 'level' }
  },
  {
    title: '操作',
    dataIndex: '150px',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  name: 'HospitalDetail',
  components: {
    // ApiKeyDetail
  },
  data () {
    return {
      tenantForm: this.$form.createForm(this),
      setting: {
        visible: false,
        hospitalId: 0,
        action: 'create' // create or edit
      },
      loading: false,
      columns: columns,
      medicalSupplies: [],
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {},
  methods: {
    fetchData (hospitalId) {
      const promise = apiGetHospitalMedicalSupplies(hospitalId)
      this.loading = true
      promise.then(response => {
        console.log('fetchData:', response)
        this.medicalSupplies = response.data
        this.loading = false
      }).catch(context => {
        this.loading = false
        this.notification.httpError(`加载租户列表数据失败！`, context.response)
      })
    },
    handleSubmit () {
      switch (this.setting.action) {
        case 'create':
          this.createTenant()
          break
        case 'edit':
          this.updateTenant()
          break
        default:
          break
      }
    },
    handleClose () {
      this.closeDrawer()
    },
    openDrawer (record) {
      this.setting.visible = true
      if (record === undefined) {
        this.setting.action = 'create'
        record = {}
      } else {
        this.setting.action = 'edit'
        this.setting.hospitalId = record.hospitalId
      }

      this.$nextTick(() => {
        this.tenantForm.setFieldsValue({
          id: record.hospitalId,
          city: record.city,
          name: record.name,
          staffCount: record.staffCount,
          address: record.address,
          canReceive: record.canReceive,
          remark: record.remark
        })
        this.fetchData(this.setting.hospitalId)
      })
    },
    closeDrawer () {
      this.tenantForm.setFieldsValue({})
      this.setting.tenantId = 0
      this.setting.visible = false
    },
    createTenant () {
      // this.tenantForm.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('values', values)
      //     const promise = apiCreateTenant(values)
      //     promise.then(data => {
      //       this.notification.success(`创建成功！`)
      //       this.closeDrawer()
      //       this.$emit('submit', values)
      //     }).catch(context => {
      //       this.notification.httpError(`创建失败！`, context.response)
      //     })
      //   }
      // })
    },
    updateTenant () {
      // this.tenantForm.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('values', values)
      //     console.log('this.setting.tenantId', this.setting.tenantId)
      //     const promise = apiUpdateTenant(this.setting.tenantId, values)
      //     promise.then(data => {
      //       this.notification.success(`修改成功！`)
      //       this.closeDrawer()
      //       this.$emit('submit', values)
      //     }).catch(context => {
      //       this.notification.httpError(`修改失败！`, context.response)
      //     })
      //   }
      // })
    },
    handleSubmitApiKey (record) {
      this.fetchData(this.setting.hospitalId)
    },
    handleDeleteApiKey (record) {
      // const promise = apiDeleteTenantApiKey(this.setting.tenantId, record.id)
      // promise.then(context => {
      //   this.notification.info(`删除Api Key 成功！`, context.response)
      //   this.fetchData(this.setting.tenantId)
      // }).catch(context => {
      //   this.notification.httpError(`删除Api Key 失败`, context.response)
      // })
    },
    showApiKeyDrawer (record) {
      console.log('aaa', record)
      console.log('aaa-hospitalId', this.setting.hospitalId)
      this.$refs.apiKeyDrawer.openDrawer(this.setting.hospitalId, record)
    }// ,
    // closeApiKeyDrawer () {
    //   this.$refs.apiKeyDrawer.closeDrawer()
    // }
  }
}
</script>
