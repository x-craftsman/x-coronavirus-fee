<template>
  <div ref="chartDom" class="chart-x"></div>
</template>

<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import timeScatter from '@/components/Charts/data/time-scatter.json'

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
    const { DataView } = DataSet
    // fetch('@/components/Charts/data/time-scatter.json')
    //   .then(res => res.json())
    //   .then(data => {
    //   })
    var data = timeScatter
    const chart = new G2.Chart({
      container: this.$refs.chartDom,
      forceFit: true,
      height: 400
    })

    const dv = new DataView()
    dv.source(data)
      .transform({
        type: 'map',
        callback: obj => {
          obj.exp_amo = obj.exp_amo * 1
          return obj
        }
      })

    chart.source(dv, {
      exp_dat: {
        type: 'time',
        mask: 'M/YY',
        tickCount: 14
      },
      exp_amo: {
        type: 'log',
        ticks: [ 50, 200, 500, 1500, 3000, 5000 ]
      }
    })
    chart.legend(false)
    chart.tooltip(true, {
      showTitle: false
    })
    chart.axis('exp_dat', {
      tickLine: null,
      label: {
        textStyle: {
          fontSize: 14
        }
      }
    })
    chart.axis('exp_amo', {
      tickLine: null,
      line: null,
      grid: {
        lineStyle: {
          lineDash: null,
          stroke: '#999'
        }
      },
      label: {
        formatter: val => {
          let formatted
          if (+val === 225) {
            formatted = 0
          } else {
            formatted = val / 10000
          }
          return formatted + 'ms'
        }
      }
    })
    chart.point()
      .position('exp_dat*exp_amo')
      .size('exp_amo', [ 1, 10 ])
      .opacity('exp_amo')
      .shape('circle')
      .tooltip('exp_dat*can_nam*spe_nam*exp_amo')
    chart.render()
  }
}
</script>

<style scoped>
.chart-x {
  margin: 0px;
}
</style>
