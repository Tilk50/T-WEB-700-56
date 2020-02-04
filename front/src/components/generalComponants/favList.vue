<template>
  <div>
    <div
      v-if="favs.length > 0"
    >
      <q-item
        class="raw"
        v-for="fav in favs"
        :key="fav.label">
        <div class="text-weight-bolder col-6">{{fav.name}}</div>
        <q-btn
          icon="remove_red_eye"
          color="primary"
          :label="$t('labels.see')"
          @click="showFav(fav)"
        />
      </q-item>
    </div>
    <div
      v-else
    >
      {{$t('labels.no_favs')}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'favList',
  props: ['favs'],
  methods: {
    showFav (fav) {
      this.$root.$emit('openModal', ['crypto-modal', fav._id])
    }
  }
}
</script>

<style scoped>

</style>
