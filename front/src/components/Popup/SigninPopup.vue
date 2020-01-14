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
            ref="pwd1"
            filled
            v-model="pwd1"
            :label="$t('labels.password')"
            :hint="$t('hints.enter_password')"
            type="password"
          />
          <q-input
            ref="pwd2"
            filled
            v-model="pwd2"
            :label="$t('labels.password')"
            :hint="$t('hints.password_confirm')"
            type="password"
            :rules="[ val => val && (val.length > 0 && val === this.pwd1) || $t('errors.password_different')]"
          />
        </form>
      </div>
    </q-card-section>
    <!-- Notice v-close-popup -->
    <q-card-actions align="center">
      <q-btn :label="$t('labels.login')" type="submit" color="primary" icon="send" @click="signin()" :disable="!goodData"/>
      <q-btn icon="close" :label="$t('labels.cancel')" v-close-popup/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'SigninPopup',
  data () {
    return {
      mail: '',
      pwd1: '',
      pwd2: ''
    }
  },
  methods: {
    signin () {
      this.$axios({
        method: 'post',
        url: '',
        data: {
          mail: this.mail,
          password: this.pwd1
        }
      }).then(function (response) {
        console.log(response)
      })
    }
  },
  computed: {
    goodData () {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return this.mail.length > 0 && re.test(this.mail.toLocaleLowerCase()) && this.pwd1 === this.pwd2
    }
  }
}
</script>

<style scoped>

</style>
