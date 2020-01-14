<template>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('global_page.label.account')}}</div>
      </q-card-section>
      <q-separator/>
      <q-card-section v-if="showAccountInfo">
        <q-btn color="negative">{{$t('labels.log_out')}}</q-btn>
      </q-card-section>
      <q-card-section v-else>
        <q-btn
          color="positive"
          :label="$t('labels.log_in')"
          @click="showConnexionDialog = true"
        />
      </q-card-section>
      <!-- DIALOG Definition -->
      <q-dialog
        v-model="showConnexionDialog"
        persistent
        :maximized="true"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <login-popup/>
      </q-dialog>
    </q-card>
</template>

<script>
import LoginPopup from '../Popup/LoginPopup'
export default {
  name: 'MyAccount',
  components: { LoginPopup },
  data () {
    return {
      showAccountInfo: false,
      showConnexionDialog: false
    }
  },
  mounted () {
    this.showAccountInfo = (this.$q.localStorage.has('account') && this.$q.localStorage.getItem('account') !== null)
  }
}
</script>

<style scoped>

</style>
