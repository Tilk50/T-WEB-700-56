<template>
  <div class="row">
    <crypto-list class="col-12" :admin="true"/>
    <br/>
    <q-btn
      color="primary"
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
      }).then(() => {
        this.$q.notify({
          icon: 'check_circle',
          color: 'positive',
          message: this.$t('labels.data_uploaded'),
          position: 'top-right'
        })
      }).catch((error) => {
        // Test if the token isn't valid
        if (error.response.data.message === 'Invalid token') {
          this.$root.$emit('token-invalid')
        } else if (error.response.data.message === 'Permission denied') {
          this.$root.$emit('permission-denied')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
