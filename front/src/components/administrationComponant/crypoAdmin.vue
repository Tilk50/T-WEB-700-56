<template>
  <div class="row">
    <crypto-list class="col-12" :admin="true"/>
    <br/>
    <q-btn
      @click="refreshData"
      class="col-6 offset-3 q-mt-md"
      icon="cached"
      :label="$t('global_page.label.load_data')"
    />
  </div>
</template>

<script>
import CryptoList from '../cryptoComponant/cryptoList'
export default {
  name: 'crypoAmdin',
  components: { CryptoList },
  methods: {
    refreshData () {
      this.$axios({
        method: 'get',
        url: 'http://localhost:3000/api/admin/importData',
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
        }
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
