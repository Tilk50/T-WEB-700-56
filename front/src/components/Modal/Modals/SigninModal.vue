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
            :error-message="$t('errors.enter_mail')"
            :error="!goodMail"
            @blur="checkEmail()"
          />
          <q-input
            ref="pwd1"
            filled
            v-model="pwd1"
            :label="$t('labels.password')"
            :hint="$t('hints.enter_password')"
            :type="isPwd1 ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd1 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd1 = !isPwd1"
              ></q-icon>
            </template>
          </q-input>
          <div class="column">
            <q-checkbox
              v-model="havePasswordGoodLength"
              disable
              :label="$t('labels.password_length')"
            />
            <q-checkbox
              v-model="havePasswordUpperCase"
              disable
              :label="$t('labels.password_uppercase')"
            />
            <q-checkbox
              v-model="havePasswordNumber"
              disable
              :label="$t('labels.password_number')"
            />
            <q-checkbox
              v-model="havePasswordSpecialCar"
              disable
              :label="$t('labels.password_special')"
            />
          </div>
          <q-input
            v-if="goodPassword"
            ref="pwd2"
            filled
            v-model="pwd2"
            :label="$t('labels.password')"
            :hint="$t('hints.password_confirm')"
            :type="isPwd2 ? 'password' : 'text'"
            :error="!samePassword"
            :error-message="$t('errors.password_different')"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              ></q-icon>
            </template>
          </q-input>
        </form>
      </div>
    </q-card-section>
    <!-- Notice v-close-popup -->
    <q-card-actions align="center">
      <q-btn :label="$t('labels.login')" color="info" v-close-popup @click="login()"/>
      <q-btn :label="$t('labels.validate')" type="submit" color="primary" icon="send" @click="signin()" :disable="!goodData"/>
      <q-btn icon="close" :label="$t('labels.cancel')" v-close-popup/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'SigninModal',
  data () {
    return {
      mail: '',
      pwd1: '',
      pwd2: '',
      isPwd1: true,
      isPwd2: true,
      isUsedMail: false
    }
  },
  methods: {
    /**
     * Function to send the form and create an account
     */
    signin () {
      this.$axios({
        method: 'post',
        url: 'http://localhost:3000/api/sign-up',
        data: {
          user: {
            email: this.mail,
            password: this.pwd1,
            confirmPassword: this.pwd2
          }
        }
      }).then(() => {
        this.$q.notify({
          icon: 'check_circle',
          color: 'positive',
          message: this.$t('labels.account_created'),
          position: 'top-right'
        })
        this.$root.$emit('user-create')
        this.$root.$emit('close-modal')
      })
    },
    /**
     * Function to test is the mail address is already used
     */
    checkEmail () {
      if (this.goodMail) {
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/api/test-mail',
          data: {
            email: this.mail
          }
        }).then((response) => {
          if (response.data.status === 'Error') {
            this.$q.notify({
              icon: 'report_problem',
              color: 'warning',
              message: this.$t('errors.mail_already_use'),
              position: 'top-right'
            })
            this.isUsedMail = true
          } else {
            this.isUsedMail = false
          }
        })
      }
    },
    login () {
      this.$root.$emit('openModal', ['login-modal'])
    }
  },
  computed: {
    goodMail () {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return this.mail.length > 0 && re.test(this.mail.toLocaleLowerCase())
    },
    havePasswordGoodLength () {
      return this.pwd1.length > 8
    },
    havePasswordUpperCase () {
      let re = /(?=.*[A-Z])/
      return re.test(this.pwd1)
    },
    havePasswordNumber () {
      let re = /(?=.*\d)/
      return re.test(this.pwd1)
    },
    havePasswordSpecialCar () {
      let re = /(?=.*\W)/
      return re.test(this.pwd1)
    },
    goodPassword () {
      return this.havePasswordGoodLength && this.havePasswordNumber && this.havePasswordSpecialCar && this.havePasswordUpperCase
    },
    samePassword () {
      return this.pwd1 === this.pwd2
    },
    goodData () {
      return this.goodMail && this.goodPassword && this.samePassword && !this.isUsedMail
    }
  }
}
</script>

<style scoped>

</style>
