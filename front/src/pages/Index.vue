<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
    <!-- Modal definition -->
    <q-dialog
      v-model="errorDialog"
      persistent
    >
      <q-card>
        <q-card-section class="bg-warning text-white">
          <div class="text-h6">{{$t('errors.title')}}</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <div class="text-subtitle2">{{$q.localStorage.getItem('error')}}</div>
        </q-card-section>
        <!-- Notice v-close-popup -->
        <q-card-actions align="right">
          <q-btn icon="close" :label="$t('labels.close')" v-close-popup @click="closeDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      errorDialog: false
    }
  },
  methods: {
    closeDialog () {
      // Remove the error message
      this.$q.localStorage.remove('error')
    }
  },
  mounted () {
    // Check for errors
    if (this.$q.localStorage.has('error') && this.$q.localStorage.getItem('error') !== '') {
      console.log(this.$q.localStorage.getItem('error'))
      this.errorDialog = true
    }
    // Delete localStorage
    if (this.$q.localStorage.has('search')) {
      this.$q.localStorage.remove('search')
    }
  }
}
</script>
