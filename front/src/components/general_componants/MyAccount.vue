<template>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('global_page.label.account')}}</div>
      </q-card-section>
      <q-separator/>
      <q-card-section v-if="showAccountInfo">
        <q-btn color="negative">{{$t('labels.log_out')}}</q-btn>
      </q-card-section>
      <q-card-section v-else class="q-pa-md q-gutter-sm">
        <q-btn
          color="primary"
          :label="$t('labels.log_in')"
          @click="showConnexionDialog = true"
        />
        <q-btn
          color="info"
          :label="$t('labels.sign_in')"
          @click="showCreateAccountDialog = true"
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
        <login-popup v-on:user-signin="signin()"/>
      </q-dialog>
      <q-dialog
        v-model="showCreateAccountDialog"
        persistent
        :maximized="true"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <signin-popup/>
      </q-dialog>
    </q-card>
</template>

<script>
import LoginPopup from '../Popup/LoginPopup'
import SigninPopup from '../Popup/SigninPopup'
export default {
  name: 'MyAccount',
  components: { SigninPopup, LoginPopup },
  data () {
    return {
      showAccountInfo: false,
      showConnexionDialog: false,
      showCreateAccountDialog: false
    }
  },
  mounted () {
    this.showAccountInfo = (this.$q.localStorage.has('account') && this.$q.localStorage.getItem('account') !== null)
  },
  methods: {
    /****
     * Method to call the dialog to create an account
     */
    signin () {
      this.showConnexionDialog = false
      this.showCreateAccountDialog = true
    }
  }
}
</script>

<style scoped>

</style>
