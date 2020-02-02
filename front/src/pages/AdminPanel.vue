<template>
  <q-page>
    <q-card>
      <!-- Tabs definition -->
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="crypto" :label="$t('global_page.label.crypto_monnaie')"/>
      </q-tabs>
      <q-separator/>
      <!-- Panels definition -->
      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="crypto">
          <crypo-amdin/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import CrypoAmdin from '../components/administrationComponant/crypoAmdin'
export default {
  name: 'AdminPanel',
  components: { CrypoAmdin },
  data () {
    return {
      tab: 'crypto'
    }
  },
  mounted () {
    if (!this.$q.localStorage.has('admin') || !this.$q.localStorage.getItem('admin')) {
      this.$router.push('/')
      this.$q.localStorage.set('error', this.$t('errors.unauthorized'))
    }
  }
}
</script>

<style scoped>

</style>
