<template>
    <div ref='xy_chart_div' class='chart'>
    </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)
export default {
  name: 'XYChart',
  props: ['cols', 'getUrl', 'legend', 'xLabel', 'yLabel'],
  data () {
    return {
      chartData: [],
      chart: null
    }
  },
  mounted () {
    this.loadData()
    this.initChart()
  },
  methods: {
    loadData () {
      /* this.$axios.get(this.getUrl)
        .then((response) => {
          console.log(response.data)
        }) */
      this.chartData = [
        {
          'date': new Date(2018, 3, 20),
          'value': 90
        }, {
          'date': new Date(2018, 3, 23),
          'value': 125
        }, {
          'date': new Date(2018, 3, 26),
          'value': 77
        }, {
          'date': new Date(2018, 3, 28),
          'value': 113
        }
      ]
    },
    initChart () {
      // Create chart
      this.chart = am4core.create(this.$refs['xy_chart_div'], am4charts.XYChart)
      this.chart.paddingRight = 20
      // Create axes
      let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.minGridDistance = 50
      dateAxis.renderer.grid.template.location = 0.5
      dateAxis.startLocation = 0.5
      dateAxis.endLocation = 0.5

      // Create value axis
      this.chart.yAxes.push(new am4charts.ValueAxis())

      // Create data series
      let series = this.chart.series.push(new am4charts.LineSeries())
      series.dataFields.valueY = 'value'
      series.dataFields.dateX = 'date'
      series.strokeWidth = 3
      series.tensionX = 1
      series.bullets.push(new am4charts.CircleBullet())
      series.data = this.chartData
    }
  },
  beforeDestroy () {
    // Delete data before destroy
    this.chart.dispose()
    this.chartData = []
  }
}
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 250px;
  }
</style>
