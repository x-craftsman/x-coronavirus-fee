
<template>
  <page-view :title="`服务订阅编号：${model.id}`" :logo="imgTorineide">
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="创建人员">{{ this.model.creator }}</detail-list-item>
      <detail-list-item term="租户代码">{{ this.model.tenantCode }}</detail-list-item>
      <detail-list-item term="创建时间">{{ this.model.createTime }}</detail-list-item>
      <detail-list-item term="操作代码"><a>{{ this.model.actionCode }}</a></detail-list-item>
    </detail-list>
    <div slot="tabContent">
      <a-tabs @change="handleCardChange" class="page-header" :tabBarStyle="{ marginBottom: '0px' }">
        <a-tab-pane tab="基础信息" :key="1"></a-tab-pane>
        <a-tab-pane tab="数据分析" :key="2"></a-tab-pane>
        <a-tab-pane tab="执行记录" :key="3"></a-tab-pane>
      </a-tabs>
    </div>
    <!-- </detail-list> -->
    <a-row slot="extra" class="status-list">
      <a-col :xs="12" :sm="12">
        <div class="text">状态</div>
        <div class="heading">{{ this.model.status.text }}</div>
      </a-col>
      <a-col :xs="12" :sm="12">
        <div class="text">处理单量/天</div>
        <div class="heading">{{ this.model.executeCountPerDay }}</div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button><a-icon type="ellipsis"/></a-button>
      </a-button-group>
      <a-button type="primary" >主操作</a-button>
    </template>
    <sd-basic-info v-if="this.status.activeTabKey === 1" :model="this.subscriberModel" ></sd-basic-info>
    <sd-data-analysis v-if="this.status.activeTabKey === 2"></sd-data-analysis>
    <sd-running-log v-if="this.status.activeTabKey === 3" :subscriberId="(Number)(this.$route.params.id)"></sd-running-log>
  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import SdBasicInfo from './subscription/SubscriptionDetailBasicInfo'
import SdDataAnalysis from './subscription/SubscriptionDetailDataAnalysis'
import SdRunningLog from './subscription/SubscriptionDetailRunningLog'
import imgTorineide from '@/assets/icons/torineide/010.png'
import { getServiceSubscriber } from '@/api/service-subscribers'

const DetailListItem = DetailList.Item

export default {
  name: 'Advanced',
  components: {
    PageView,
    DetailList,
    DetailListItem,
    SdBasicInfo,
    SdDataAnalysis,
    SdRunningLog
  },
  mixins: [mixinDevice],
  data () {
    return {
      model: {
        id: this.$route.params.id,
        creator: 'alan.luo',
        createTime: '2019-12-12 16:12:30',
        tenantCode: 'tenant Code',
        actionCode: 'action Code',
        status: {
          value: 0,
          text: '运行中'
        },
        executeCountPerDay: 32654
      },
      status: {
        activeTabKey: 1
      },
      imgTorineide: imgTorineide,
      subscriberModel: {
        mappingRule: {
          type: 0
        }
      }
    }
  },
  mounted () {
    this.init()
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '成功',
        'reject': '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    }
  },
  methods: {
    init () {
      var id = this.$route.params.id
      var promise = getServiceSubscriber(id)
      promise.then(res => {
        this.subscriberModel = res
        console.log('subscriberModel==>', this.subscriberModel)
      }).catch(() => {
        this.$message.info('获取明细信息失败！')
      })
    },
    handleCardChange (key) {
      this.status.activeTabKey = key
    }
  }
}
</script>

<style lang="less" scoped>

  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }

  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {

    }
    .status-list {
      text-align: left;
    }
  }
</style>
