<template>
    <q-card>
      <q-card-section class="bg-primary text-white">
        <span class="text-h6">
          {{title}}
        </span>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <!-- Display XyChart-->
        <x-y-chart
          v-if="type == 'XY-chart'"
          :getUrl="getUrl"
          :legende="legende"
          :cols="cols"
          :xLabel="xLabel"
          :yLabel="yLabel"
        />
      </q-card-section>
    </q-card>
</template>

<script>
import XYChart from './chartsType/XYChart'
export default {
  name: 'chartManager',
  components: { XYChart },
  props: ['title', 'cols', 'getUrl', 'type', 'legende', 'xLabel', 'yLabel']
}
</script>

<style scoped>

</style>
