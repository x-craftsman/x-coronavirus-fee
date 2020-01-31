<template>
  <div ref="chartDom" class="chart-x"></div>
</template>

<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'

export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {
    const data = [
      { day: '12-01', total: 3162, error: 42 },
      { day: '12-02', total: 2134, error: 54 },
      { day: '12-03', total: 3116, error: 26 },
      { day: '12-04', total: 4122, error: 32 },
      { day: '12-05', total: 5178, error: 68 },
      { day: '12-06', total: 5144, error: 54 },
      { day: '12-07', total: 1000, error: 500 }
    ]
    const dv = new DataSet.View().source(data)
    dv.transform({
      type: 'fold',
      fields: [ 'total', 'error' ],
      key: 'type',
      value: 'value'
    })
    const chart = new G2.Chart({
      container: this.$refs.chartDom,
      forceFit: true,
      height: 400
    })
    chart.source(dv, {
      value: {
        alias: 'alias',
        formatter (val) {
          return (val / 1000) + 'k'
        }
      },
      day: {
        range: [ 0, 1 ]
      }
    })
    chart.tooltip({
      crosshairs: true
    })
    chart.area()
      .position('day*value')
      .color('type', ['#74BCFF', '#f8371d'])
      .shape('smooth')
    chart.line()
      .position('day*value')
      .color('type', ['#74BCFF', '#f8371d'])
      .size(2)
      .shape('smooth')
    chart.render()
  }
}
</script>

<style scoped>
.chart-x {
  margin: 0px;
}
</style>
