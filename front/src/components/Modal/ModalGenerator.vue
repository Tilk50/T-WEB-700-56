<template>
  <q-dialog
    v-model="openIt"
    :maximized="maximizedModal"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div>
      <!-- Call the good modal -->
      <crypto-modal :crypto_id="id" v-if="modalToOpen === 'crypto-modal'"/>
      <invalid-token-pop-up v-if="modalToOpen === 'invalid_token'"/>
      <signin-modal v-if="modalToOpen === 'sign-in-modal'"/>
      <login-modal v-if="modalToOpen === 'login-modal'"/>
    </div>
  </q-dialog>
</template>

<script>
import CryptoModal from './Modals/cryptoModal'
import InvalidTokenPopUp from './Modals/InvalidTokenModal'
import SigninModal from './Modals/SigninModal'
import LoginModal from './Modals/LoginModal'
export default {
  name: 'ModalGenerator',
  components: { LoginModal, SigninModal, InvalidTokenPopUp, CryptoModal },
  data () {
    return {
      openIt: false,
      modalToOpen: '',
      id: null
    }
  },
  created () {
    this.$root.$on('openModal', this.openModal)
    this.$root.$on('close-modal', this.closeModal)
  },
  methods: {
    closeModal () {
      this.modalToOpen = ''
      this.id = null
      this.openIt = false
    },
    openModal (props) {
      this.modalToOpen = props[0]
      this.id = props[1]
      this.openIt = true
    }
  },
  computed: {
    maximizedModal () {
      return this.modalToOpen !== 'invalid_token'
    }
  }
}
</script>

<style scoped>

</style>
