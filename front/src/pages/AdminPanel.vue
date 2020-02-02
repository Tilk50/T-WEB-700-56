<template>
  <q-page>
    <q-card class="q-pa-md">
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
        <q-tab name="user" :label="$t('global_page.label.users')"/>
      </q-tabs>
      <q-separator/>
      <!-- Panels definition -->
      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="crypto">
          <crypo-admin/>
        </q-tab-panel>
        <q-tab-panel name="user">
          <user-admin/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import CrypoAdmin from '../components/administrationComponant/crypoAdmin'
import UserAdmin from '../components/administrationComponant/userAdmin'
export default {
  name: 'AdminPanel',
  components: { UserAdmin, CrypoAdmin },
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
