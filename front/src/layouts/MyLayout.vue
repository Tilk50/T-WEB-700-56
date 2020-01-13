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
              @click="changeLanguage(lang)"
            >
             {{lang.label}}
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          flat
          dense
          icon="home"
          @click="goHome()"
        />
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
          <h5>{{$t('global_page.drawer.tool_list_title')}}</h5>
        </q-item>
        <!-- Search bar  -->
        <q-item>
          <q-input bottom-slots v-model="search" :label="$t('global_page.drawer.tools.search')" counter maxlength="12">

            <template v-slot:append>
              <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="send" @click="sendSearch()" :disable="enableSearch"/>
            </template>
          </q-input>
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
      lang: this.$i18n.locale,
      search: ''
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
    },
    sendSearch () {
      // Set local storage
      this.$q.localStorage.set('search', this.search)
      this.$router.push('/search')
    },
    goHome () {
      this.$router.push('/')
    }
  },
  computed: {
    enableSearch () {
      return this.search === ''
    }
  }
}
</script>
