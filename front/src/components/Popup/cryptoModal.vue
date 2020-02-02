<template>
 <div>
   {{crypto}}
 </div>
</template>

<script>
export default {
  name: 'cryptoModal',
  props: ['crypto_id'],
  data () {
    return {
      crypto: null
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios({
        method: 'get',
        url: 'http://localhost:3000/api/crypto/' + this.crypto_id
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
