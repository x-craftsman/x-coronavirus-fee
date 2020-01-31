<template>
  <div>
    <!-- 执行情况汇总 -->
    <a-card class="information-card" :bordered="false" title="执行情况汇总">
      <a-form>
        <a-row>
          <a-col :span="8" :offset="0">
            <a-form-item label="选择日期" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-range-picker v-decorator="['rangeDate', { rules: [{ type: 'array', required: true, message: '请选择时间!' }] }]" />
              <a-button type="primary" class="search-btn">查询</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-table
              :columns="columns"
              :rowKey="executionPerformance.key"
              :dataSource="this.executionPerformance"
              :pagination="false"
              :loading="loading"
              @change="handleTableChange"
            >
              <template slot="name" slot-scope="name">
                {{ name.first }} {{ name.last }}
              </template>
            </a-table>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <!-- 七日内服务调用（频次/时间） -->
    <a-card class="information-card" :bordered="false" title="七日内服务调用（频次/时间）">
      <div>
        <a-row>
          <a-col :span="16" :offset="0">
            <g2-area-chart></g2-area-chart>
          </a-col>
          <a-col :span="6" :offset="1">
            <chart-card :loading="loading" title="7天内调用次数" :total="8846 | NumberFormat">
              <a-tooltip title="7天内服务调用频次" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <trend flag="up" style="margin-right: 16px;"><span slot="term">周同比</span>12%</trend>
                <trend flag="down"><span slot="term">日同比</span>11%</trend>
              </div>
            </chart-card>
            <chart-card :loading="loading" title="7天内错误次数" :total="362 | NumberFormat">
              <a-tooltip title="指标说明" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <trend flag="up" style="margin-right: 16px;"><span slot="term">周同比</span>12%</trend>
                <trend flag="down"><span slot="term">日同比</span>11%</trend>
              </div>
            </chart-card>
          </a-col>
        </a-row>
      </div>
    </a-card>

    <!-- 七日内执行时间分布 -->
    <a-card class="information-card" :bordered="false" title="七日内执行时间分布">
      <div>
        <a-row>
          <a-col :span="16" :offset="0">
            <g2-scatter-chart></g2-scatter-chart>
          </a-col>
          <a-col :span="6" :offset="1">
            <chart-card :loading="loading" title="7天内平均响应时间（ms）" :total="846 | NumberFormat">
              <a-tooltip title="7天内服务调用频次" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <trend flag="up" style="margin-right: 16px;"><span slot="term">周同比</span>12%</trend>
                <trend flag="down"><span slot="term">日同比</span>11%</trend>
              </div>
            </chart-card>
            <chart-card :loading="loading" title="7天内异常请求数量" :total="362 | NumberFormat">
              <a-tooltip title="响应时间超过3s的请求为异常请求" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <trend flag="up" style="margin-right: 16px;"><span slot="term">周同比</span>12%</trend>
                <trend flag="down"><span slot="term">日同比</span>11%</trend>
              </div>
            </chart-card>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>
<script>
import G2AreaChart from '@/components/Charts/G2AreaChart'
import G2ScatterChart from '@/components/Charts/G2ScatterChart'
import { ChartCard, Trend } from '@/components'
const columns = [
  {
    title: '执行次数',
    dataIndex: 'execCount',
    width: '10%',
    scopedSlots: { customRender: 'execCount' }
  },
  {
    title: '错误率',
    dataIndex: 'errorRate',
    width: '10%',
    scopedSlots: { customRender: 'errorRate' }
  },
  {
    title: '最小值(ms)',
    dataIndex: 'mixResponseTime',
    width: '10%',
    scopedSlots: { customRender: 'mixResponseTime' }
  },
  {
    title: '平均值(ms)',
    dataIndex: 'avgResponseTime',
    width: '10%',
    scopedSlots: { customRender: 'avgResponseTime' }
  },
  {
    title: '最大值(ms)',
    dataIndex: 'maxResponseTime',
    width: '10%',
    scopedSlots: { customRender: 'maxResponseTime' }
  },
  {
    title: '90th pct',
    dataIndex: 'Pct90',
    width: '10%',
    scopedSlots: { customRender: 'Pct90' }
  },
  {
    title: '95th pct',
    dataIndex: 'Pct95',
    width: '10%',
    scopedSlots: { customRender: 'Pct95' }
  },
  {
    title: '99th pct',
    dataIndex: 'Pct99',
    width: '10%',
    scopedSlots: { customRender: 'Pct99' }
  },
  {
    title: '吞吐量/s',
    dataIndex: 'throughput',
    width: '10%',
    scopedSlots: { customRender: 'throughput' }
  },
  {
    title: '健康等级',
    dataIndex: 'healthLevel',
    width: '10%',
    scopedSlots: { customRender: 'healthLevel' }
  }
]
export default {
  components: {
    G2AreaChart,
    G2ScatterChart,
    ChartCard,
    Trend
  },
  props: {},
  data () {
    return {
      columns: columns,
      loading: false,
      executionPerformance: [{
        key: '10001',
        execCount: '123564',
        errorRate: '0.26%',
        mixResponseTime: '125',
        avgResponseTime: '560',
        maxResponseTime: '869',
        Pct90: '560',
        Pct95: '560',
        Pct99: '560',
        throughput: '580',
        healthLevel: '健康'
      }]
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    }
  },
  created () {},
  mounted () {}
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
