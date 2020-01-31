<template>
  <div>
    <a-drawer
      :title="((setting.action !== 'edit') ? '创建' : '编辑') + '租户信息'"
      :width="720"
      @close="handleClose"
      :visible="setting.visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="tenantForm" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="租户名称">
              <a-input
                v-decorator="['name', { rules: [{ required: true, message: '请输入租户名称' }] }]"
                placeholder="请输入租户名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="租户代码">
              <a-input
                v-decorator="['code', { rules: [{ required: true, message: '请输入租户代码' }] }]"
                placeholder="请输入租户代码"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="租户别名">
              <a-input
                v-decorator="['nickname', { rules: [{ required: true, message: '请输入租户别名' }] }]"
                placeholder="请输入租户别名"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系人">
              <a-input
                v-decorator="['contactName', { rules: [{ required: true, message: '请输入联系人' }] }]"
                placeholder="请输入联系人"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="联系电话">
              <a-input
                v-decorator="['contactTel', { rules: [{ required: true, message: '请输入联系电话' }] }]"
                placeholder="请输入联系电话"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系邮箱">
              <a-input
                v-decorator="['contactEmail', { rules: [{ required: true, message: '请输入联系邮箱' }] }]"
                placeholder="请输入联系邮箱"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="类型">
              <a-select
                v-decorator="['type', { rules: [{ required: true, message: '请选择类型' }] }]"
                placeholder="请选择类型"
              >
                <a-select-option :value="1">签约</a-select-option>
                <a-select-option :value="2">试用</a-select-option>
                <a-select-option :value="3">遗失</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态">
              <a-select
                v-decorator="['status', { rules: [{ required: true, message: '请选择状态' }] }]"
                placeholder="请选择状态"
              >
                <a-select-option :value="0">禁用</a-select-option>
                <a-select-option :value="1">启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div v-if="this.setting.action === 'edit'">
        <a-table
          :columns="columns"
          :rowKey="record => record.name"
          :dataSource="apiKeys"
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
        <a-button type="primary" icon="plus" :style="{ marginTop: '10px' }" @click="showApiKeyDrawer()">添加 Key</a-button>
        <api-key-detail ref="apiKeyDrawer" @submit="handleSubmitApiKey"/>
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
  createTenant as apiCreateTenant,
  updateTenant as apiUpdateTenant,
  getTenantApiKeys as apiGetTenantApiKeys,
  deleteTenantApiKey as apiDeleteTenantApiKey
} from '@/api/tenant'
// import component.
import ApiKeyDetail from './TenantApiKeyDetail'
import Notification from '@/utils/notification'

const columns = [
  {
    title: '#系统Id',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: 'Key名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Key值',
    dataIndex: 'value',
    width: '50%',
    scopedSlots: { customRender: 'value' }
  },
  {
    title: '操作',
    dataIndex: '150px',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  name: 'TenantDetailView',
  components: {
    ApiKeyDetail
  },
  data () {
    return {
      tenantForm: this.$form.createForm(this),
      setting: {
        visible: false,
        tenantId: 0,
        action: 'create' // create or edit
      },
      loading: false,
      columns: columns,
      apiKeys: [],
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {},
  methods: {
    fetchData (tenantId) {
      const promise = apiGetTenantApiKeys(tenantId)
      this.loading = true
      promise.then(response => {
        console.log('fetchData:', response)
        this.apiKeys = response.data
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
        this.setting.tenantId = record.id
      }

      this.$nextTick(() => {
        this.tenantForm.setFieldsValue({
          name: record.name,
          code: record.code,
          nickname: record.nickname,
          type: record.type,
          status: record.status,
          contactName: record.contactName,
          contactTel: record.contactTel,
          contactEmail: record.contactEmail
        })
        this.fetchData(this.setting.tenantId)
      })
    },
    closeDrawer () {
      this.tenantForm.setFieldsValue({})
      this.setting.tenantId = 0
      this.setting.visible = false
    },
    createTenant () {
      this.tenantForm.validateFields((err, values) => {
        if (!err) {
          console.log('values', values)
          const promise = apiCreateTenant(values)
          promise.then(data => {
            this.notification.success(`创建成功！`)
            this.closeDrawer()
            this.$emit('submit', values)
          }).catch(context => {
            this.notification.httpError(`创建失败！`, context.response)
          })
        }
      })
    },
    updateTenant () {
      this.tenantForm.validateFields((err, values) => {
        if (!err) {
          console.log('values', values)
          console.log('this.setting.tenantId', this.setting.tenantId)
          const promise = apiUpdateTenant(this.setting.tenantId, values)
          promise.then(data => {
            this.notification.success(`修改成功！`)
            this.closeDrawer()
            this.$emit('submit', values)
          }).catch(context => {
            this.notification.httpError(`修改失败！`, context.response)
          })
        }
      })
    },
    handleSubmitApiKey (record) {
      this.fetchData(this.setting.tenantId)
    },
    handleDeleteApiKey (record) {
      const promise = apiDeleteTenantApiKey(this.setting.tenantId, record.id)
      promise.then(context => {
        this.notification.info(`删除Api Key 成功！`, context.response)
        this.fetchData(this.setting.tenantId)
      }).catch(context => {
        this.notification.httpError(`删除Api Key 失败`, context.response)
      })
    },
    showApiKeyDrawer (record) {
      console.log('aaa', record)
      console.log('aaa-tenantId', this.setting.tenantId)
      this.$refs.apiKeyDrawer.openDrawer(this.setting.tenantId, record)
    }// ,
    // closeApiKeyDrawer () {
    //   this.$refs.apiKeyDrawer.closeDrawer()
    // }
  }
}
</script>
