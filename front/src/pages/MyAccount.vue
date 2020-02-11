<template>
  <q-page>
    <q-card>
      <q-card-section
        class="bg-primary text-white"
      >
        <span class="text-h6">{{$t('labels.my_account_information')}}</span>
      </q-card-section>
      <q-separator/>
      <q-card-section class="row justify-between">
        <global-informations :user="me" class="col-4"/>
        <list-fav :user="me" class="col-4"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import GlobalInformations from '../components/myAccount/globalInformations'
import ListFav from '../components/myAccount/listFav'
export default {
  name: 'MyAccount',
  data () {
    return {
      me: null
    }
  },
  created () {
    this.$root.$on('fav-updated', this.loadData)
  },
  components: { ListFav, GlobalInformations },
  mounted () {
    // Check that user is logged
    if (!this.$q.localStorage.has('jwt')) {
      this.$router.push('/')
      this.$q.localStorage.set('error', this.$t('errors.unidentified'))
    }
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios({
        method: 'get',
        url: 'http://localhost:3000/api/me',
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
        }
      }).then((response) => {
        this.me = response.data.user
      }).catch((error) => {
        // Test if the token isn't valid
        if (error.response.data.message === 'Invalid token') {
          this.$root.$emit('token-invalid')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
