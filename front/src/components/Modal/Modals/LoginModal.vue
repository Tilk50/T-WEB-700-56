<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{$t('labels.log_in')}}</div>
    </q-card-section>
    <q-card-section class="q-ma-md q-pa-md">
      <div class="fa-align-center">
        <form class="q-pa-md q-gutter-md">
          <q-input
            ref="mail"
            filled
            v-model="mail"
            :label="$t('labels.mail_address')"
            :hint="$t('hints.enter_mail_address')"
            lazy-rules
            type="email"
            :rules="[ val => val && val.length > 0 || $t('errors.enter_mail')]"
          />
          <q-input
            ref="pwd"
            filled
            v-model="pwd"
            :label="$t('labels.password')"
            :hint="$t('hints.enter_password')"
            type="password"
          />
        </form>
      </div>
    </q-card-section>
    <!-- Notice v-close-popup -->
    <q-card-actions align="center">
      <q-btn :label="$t('labels.sign_in')" color="info" v-close-popup @click="signin()"/>
      <q-btn :label="$t('labels.login')" type="submit" color="primary" icon="send" @click="login()" :disable="!goodData"/>
      <q-btn icon="close" :label="$t('labels.cancel')" v-close-popup/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'LoginModal',
  data () {
    return {
      mail: '',
      pwd: ''
    }
  },
  methods: {
    signin () {
      // Emit to parent componant that we want to sign in
      this.$root.$emit('openModal', ['sign-in-modal'])
    },
    login () {
      this.$axios({
        method: 'post',
        url: 'http://localhost:3000/api/sign-in',
        data: {
          email: this.mail,
          password: this.pwd
        }
      }).then((response) => {
        // Test if the response status is good
        if (response.status === 200) {
          // Setting the token in localStorage
          this.$q.localStorage.set('jwt', response.data.jwt)
          // Set in local Storage the user role
          this.$q.localStorage.set('admin', response.data.admin)
          // Emit to the parent componant that we avec sign in
          this.$root.$emit('close-modal')
          this.$root.$emit('user-logged')
        }
      })
    }
  },
  computed: {
    goodData () {
      return this.mail !== '' && this.pwd !== ''
    }
  }
}
</script>

<style scoped>

</style>
