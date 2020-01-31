<template>
  <div>
    <a-drawer
      title="选择租户"
      :width="720"
      @close="handleClose"
      :visible="tenant.visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <div>
        <a-table
          :columns="tenant.columns"
          :rowKey="record => record.id"
          :dataSource="tenant.datas"
          :loading="tenant.loading"
          :pagination="false"
          bordered
        >
          <template slot="id" slot-scope="id">
            # {{ id }}
          </template>
          <template slot="operation" slot-scope="operation, record">
            <a @click="handleTenantSelected(record)">选择</a>
          </template>
        </a-table>
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
      </div>
    </a-drawer>
    <!-- api key -->
    <a-drawer
      title="选择 Api Key"
      :width="580"
      @close="handleClose"
      :visible="apiKey.visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <div>
        <a-table
          :columns="apiKey.columns"
          :rowKey="record => record.id"
          :dataSource="apiKey.datas"
          :loading="apiKey.loading"
          :pagination="false"
          bordered
        >
          <template slot="id" slot-scope="id">
            # {{ id }}
          </template>
          <template slot="operation" slot-scope="operation, record">
            <a @click="handleApiKeySelected(record)">选择</a>
          </template>
        </a-table>
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
          textAlign: 'right'
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="handleClose">取消</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
// import api.
import {
  getTenants as apiGetTenants,
  getTenantApiKeys as apiGetTenantApiKeys
} from '@/api/tenant'
// import component.
import Notification from '@/utils/notification'

const tenantColumns = [
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
    title: '操作',
    dataIndex: '150px',
    scopedSlots: { customRender: 'operation' }
  }
]

const apiKeyColumns = [
  {
    title: '#系统Id',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: 'Key 名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Key 值',
    dataIndex: 'value',
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '操作',
    dataIndex: '150px',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  name: 'TenantApiKeySelect',
  components: {},
  data () {
    return {
      tenant: {
        loading: false,
        visible: false,
        datas: [],
        columns: tenantColumns
      },
      apiKey: {
        loading: false,
        visible: false,
        datas: [],
        columns: apiKeyColumns
      },
      selectData: {
        tenant: null,
        apiKey: null
      },
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {},
  methods: {
    fetchTenantData () {
      const promise = apiGetTenants()
      this.tenant.loading = true
      promise.then(response => {
        this.tenant.datas = response.data
        this.tenant.loading = false
      }).catch(context => {
        this.loading = false
        this.notification.httpError(`加载列表数据失败！`, context.response)
      })
    },
    fetchApiKeyData (tenantId) {
      const promise = apiGetTenantApiKeys(tenantId)
      this.apiKey.loading = true
      promise.then(response => {
        this.apiKey.datas = response.data
        this.apiKey.loading = false
      }).catch(context => {
        this.apiKey.loading = false
        this.notification.httpError(`加载列表数据失败！`, context.response)
      })
    },
    handleTenantSelected (record) {
      this.selectData.tenant = record
      this.apiKey.visible = true
      this.$nextTick(() => {
        this.fetchApiKeyData(record.id)
      })
    },
    handleApiKeySelected (record) {
      this.selectData.apiKey = record
      const data = this.selectData
      this.$emit('select', data)
      this.closeDrawer()
    },
    handleClose () {
      this.closeDrawer()
    },
    openDrawer () {
      this.tenant.visible = true
      this.$nextTick(() => {
        this.fetchTenantData()
      })
    },
    closeDrawer () {
      this.apiKey = {
        loading: false,
        visible: false,
        datas: [],
        columns: apiKeyColumns
      }
      this.tenant = {
        loading: false,
        visible: false,
        datas: [],
        columns: tenantColumns
      }
    }
  }
}
</script>
