<template>
  <div>
    <a-drawer
      title="选择系统服务"
      :width="720"
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
          <template slot="operation" slot-scope="operation, record">
            <a @click="handleSelected(record)">选择</a>
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
  </div>
</template>

<script>
// import api.
import {
  getSystemServices as apiGetSystemServices
} from '@/api/system-services'
// import component.
import Notification from '@/utils/notification'

const columns = [
  {
    title: '#系统Id',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '系统代码',
    dataIndex: 'systemCode',
    scopedSlots: { customRender: 'systemCode' }
  },
  {
    title: '操作代码',
    dataIndex: 'actionCode',
    scopedSlots: { customRender: 'actionCode' }
  },
  {
    title: '操作',
    dataIndex: '150px',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  name: 'SystemServcieSelect',
  components: {},
  data () {
    return {
      loading: false,
      visible: false,
      columns: columns,
      datas: [],
      notification: new Notification(this.$notification)
    }
  },
  created () {},
  mounted () {},
  methods: {
    fetchData () {
      const promise = apiGetSystemServices()
      this.loading = true
      promise.then(response => {
        this.datas = response.data
        this.loading = false
      }).catch(context => {
        this.loading = false
        this.notification.httpError(`加载列表数据失败！`, context.response)
      })
    },
    handleSelected (record) {
      this.$emit('select', record)
      this.closeDrawer()
    },
    handleClose () {
      this.closeDrawer()
    },
    openDrawer () {
      this.visible = true
      this.$nextTick(() => {
        this.fetchData()
      })
    },
    closeDrawer () {
      this.datas = []
      this.visible = false
    }
  }
}
</script>
