<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar
        class="row"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          {{ $t('global_page.title') }}
        </q-toolbar-title>
        <q-btn-dropdown
          stretch
          flat
          :label="$t('global_page.choose_language')"
        >
          <q-list>
            <q-item
              v-for="lang in langs"
              :key="lang.value"
              clickable
              v-close-popup
              v-on:click="changeLanguage(lang)"
            >
             {{lang.label}}
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <!-- tool list for the drawer -->
      <q-list>
        <q-item>
          <h3>{{$t('')}}</h3>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      langs: [],
      lang: this.$i18n.locale
    }
  },
  watch: {
    lang (lang) {
      // Test default local language
      this.$i18n.locale = lang.value
      this.loadLanguages()
      console.log(lang)
      this.lang.label = this.$t(`global_page.languages.${lang.name}`)
    }
  },
  mounted () {
    this.loadLanguages()
  },
  methods: {
    loadLanguages () {
      this.langs = [
        {
          label: this.$t('global_page.languages.french'),
          value: 'fr-fr',
          name: 'french'
        },
        {
          label: this.$t('global_page.languages.english'),
          value: 'en-us',
          name: 'english'
        }
      ]
    },
    changeLanguage (lang) {
      this.lang = lang
    }
  }
}
</script>
