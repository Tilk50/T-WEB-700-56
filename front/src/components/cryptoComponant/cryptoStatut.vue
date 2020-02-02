<template>
    <div>
      {{parseFloat(cryptoChange)}}
      <q-icon
        :name="iconStatus"
        :color="colorStatus"
        size="xl"
      />
    </div>
</template>

<script>
export default {
  name: 'cryptoStatut',
  props: ['cryptoChange'],
  computed: {
    colorStatus () {
      let color = ''
      if (parseFloat(this.cryptoChange) <= -1.00) {
        color = 'red'
      } else if (parseFloat(this.cryptoChange) > -1.00 && parseFloat(this.cryptoChange) < 1.00) {
        color = 'orange'
      } else if (parseFloat(this.cryptoChange) >= 1.00) {
        color = 'green'
      }
      return color
    },
    iconStatus () {
      let icon = ''
      if (parseFloat(this.cryptoChange) <= -1.00) {
        icon = 'trending_down'
      } else if (parseFloat(this.cryptoChange) > -1.00 && parseFloat(this.cryptoChange) < 1.00) {
        icon = 'trending_flat'
      } else if (parseFloat(this.cryptoChange) >= 1.00) {
        icon = 'trending_up'
      }
      return icon
    }
  }
}
</script>

<style scoped>

</style>
