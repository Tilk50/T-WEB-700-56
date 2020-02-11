<template>
  <q-card>
    <q-card-section>
      <span class="text-h6">{{$t('global_page.drawer.tools.fav_title')}}</span>
    </q-card-section>
    <q-separator/>
    <q-card-section v-if="user.favorites.length > 0">
      <q-list>
        <q-item class="row">
          <q-item-section class="col-4">
            <span class="text-bold">{{$t('labels.crypto_object.name')}}</span>
          </q-item-section>
          <q-item-section class="col-4">
            <span class="text-bold">{{$t('labels.crypto_object.actual_price')}}</span>
          </q-item-section>
          <q-item-section class="col-4">
            <span class="text-bold">{{$t('labels.actions')}}</span>
          </q-item-section>
        </q-item>
        <q-item
          v-for="fav in user.favorites"
          :key="fav.id"
          class="row"
        >
          <q-item-section class="col-4">
            <span>{{fav.name}}</span>
          </q-item-section>

          <q-item-section class="col-4">
            <span>{{fav.price}}</span>
          </q-item-section>
          <q-item-section class="col-4 row justify-around">
            <q-btn
              color="primary"
              @click="showFav(fav.id)"
              icon="remove_red_eye"
              size="sm"
            />
            <q-btn
              @click="removeFav(fav.id)"
              size="sm"
              color="negative"
              icon="delete"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section v-else>
      <span class="text-bold">{{$t('labels.no_favs')}}</span>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'listFav',
  props: ['user'],
  methods: {
    showFav (fav) {
      this.$root.$emit('openModal', ['crypto-modal', fav])
    },
    removeFav (id) {
      this.$axios({
        method: 'delete',
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
        },
        url: 'http://localhost:3000/api/crypto/remove-fav/' + id
      }).then(() => {
        this.$q.notify({
          icon: 'report_problem',
          color: 'warning',
          message: this.$t('labels.crypto_removed_from_favs'),
          position: 'top-right'
        })
        this.$root.$emit('fav-updated')
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
