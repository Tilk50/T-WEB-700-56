<template>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('global_page.label.account')}}</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="justify-around" v-if="showAccountInfo">
        <q-btn
          color="secondary"
          @click="myAccount"
          :label="$t('labels.my_account')"
          icon="account_circle"
        />
        <q-btn
          color="negative"
          @click="logout()"
          :label="$t('labels.log_out')"
        />
      </q-card-actions>
      <q-card-actions v-else class="q-pa-md q-gutter-sm justify-around">
        <q-btn
          color="primary"
          :label="$t('labels.log_in')"
          @click="login"
        />
        <q-btn
          color="info"
          :label="$t('labels.sign_in')"
          @click="signin"
        />
      </q-card-actions>
    </q-card>
</template>

<script>
export default {
  name: 'MyAccount',
  data () {
    return {
      showAccountInfo: false
    }
  },
  mounted () {
    this.showAccountInfo = (this.$q.localStorage.has('jwt') && this.$q.localStorage.getItem('jwt') !== null)
  },
  methods: {
    signin () {
      this.$root.$emit('openModal', ['sign-in-modal'])
    },
    login () {
      this.$root.$emit('openModal', ['login-modal'])
    },
    logout () {
      // Remove localStorage
      this.$q.localStorage.remove('jwt')
      // Emit that user have logout
      this.$root.$emit('user-logout')
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/')
      }
    },
    myAccount () {
      this.$router.push('/me')
    }
  }
}
</script>

<style scoped>

</style>
