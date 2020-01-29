<template>
    <q-card>
      <q-card-section
        class="bg-primary text-white"
      >
        <div class="text-h6">{{$t('labels.crypto_list')}}</div>
      </q-card-section>
      <q-card-section>
        <q-table
          :data="data"
          :columns="columns"
        >
        </q-table>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: 'cryptoList',
  data () {
    return {
      data: [],
      columns: [
        { name: 'name', label: this.$t('labels.crypto_object.name'), field: 'name', sortable: true },
        { name: 'symbol', label: this.$t('labels.crypto_object.symbol'), field: 'symbol', sortable: true },
        { name: 'price', label: this.$t('labels.crypto_object.actual_price'), field: 'price', sortable: true }
      ]
    }
  },
  mounted () {
    // Load data
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios({
        method: 'get',
        url: 'http://localhost:3000/api/cryptos'
      }).then((response) => {
        console.log(response.data.list)
        this.data = response.data.list
      })
    }
  }
}
</script>

<style scoped>

</style>
