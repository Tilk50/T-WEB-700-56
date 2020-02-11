<template>
  <q-card>
    <q-card-section
      class="bg-primary text-white"
    >
      <span class="text-h6">{{$t('labels.update_my_info')}}</span>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <q-input/>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'UpdateMyAccount',
  data () {
    return {
      me: null
    }
  },
  mounted () {
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
