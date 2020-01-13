<template>
  <q-page>
    Coucou
  </q-page>
</template>

<script>
export default {
  name: 'Search',
  mounted () {
    // Check local storage
    if (!this.$q.localStorage.has('search') || this.$q.localStorage.getItem('search') === '') {
      this.$q.localStorage.set('error', this.$t('errors.no_search'))
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
