<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{$t('labels.log_in')}}</div>
    </q-card-section>
    <q-card-section class="q-ma-md q-pa-md">
      <div class="fa-align-center">
        <form>
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
            v-model="pwd1"
            :label="$t('labels.password')"
            :hint="$t('hints.enter_password')"
            type="password"
          />
          <q-input
            ref="pwd"
            filled
            v-model="pwd2"
            :label="$t('labels.password')"
            :hint="$t('hints.password_confirm')"
            type="password"
          />
        </form>
      </div>
    </q-card-section>
    <!-- Notice v-close-popup -->
    <q-card-actions align="center">
      <q-btn :label="$t('labels.login')" type="submit" color="primary" icon="send"/>
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
  }
}
</script>

<style scoped>

</style>
