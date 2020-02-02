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
        <q-btn
          v-if="showAdminPanel"
          :label="$t('global_page.label.admin_panel')"
          flat
          icon="build"
          @click="goAdminPanel"
        ></q-btn>
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
        <q-btn-dropdown
          v-model="showMyAccount"
          flat
          icon="account_circle"
        >
          <my-account/>
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
          <q-item-section>
            <div class="text-subtitle2">{{$t('global_page.drawer.tools.search_title')}}</div>
            <q-input bottom-slots v-model="search" :label="$t('global_page.drawer.tools.search')" counter maxlength="12">
              <template v-slot:append>
                <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
              </template>
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="sendSearch()" :disable="enableSearch"/>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <!-- Fav list -->
        <q-item>
          <q-item-section>
            <div class="text-subtitle2">{{$t('global_page.drawer.tools.fav_title')}}</div>
            <q-list v-if="isUserLogged">
              <q-item
                class="raw"
                v-for="fav in favs"
                :key="fav.label">
                <div class="text-weight-bolder col-6">{{fav.label}}</div>
                <q-btn
                  icon="send"
                  :label="$t('labels.see')"
                />
              </q-item>
            </q-list>
            <q-item v-else>
              <div>{{$t('messages.have_to_login_to_fav')}}</div>
            </q-item>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import MyAccount from '../components/generalComponants/MyAccount'
export default {
  name: 'MyLayout',
  components: { MyAccount },
  data () {
    return {
      leftDrawerOpen: true,
      langs: [],
      lang: this.$i18n.locale,
      search: '',
      favs: [],
      showMyAccount: false,
      isUserLogged: false,
      showAdminPanel: false
    }
  },
  watch: {
    lang (lang) {
      // Test default local language
      this.$i18n.locale = lang.value
      this.loadLanguages()
      this.lang.label = this.$t(`global_page.languages.${lang.name}`)
    }
  },
  mounted () {
    this.loadLanguages()
    // Test ig user is logged
    if (this.$q.localStorage.has('jwt')) {
      this.userLogged()
    }
  },
  created () {
    this.$root.$once('user-logged', this.userLogAction)
    this.$root.$on('user-logout', this.userLogAction)
  },
  methods: {
    userLogout () {
      this.favs = []
      this.isUserLogged = false
      this.showAdminPanel = false
    },
    userLogged () {
      this.isUserLogged = true
      this.getFavList()
      // Test if the user is Admin
      this.showAdminPanel = this.$q.localStorage.getItem('admin')
    },
    userLogAction () {
      this.showMyAccount = false
      if (this.$q.localStorage.has('jwt')) {
        this.userLogged()
      } else {
        this.userLogout()
      }
    },
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
    },
    getFavList () {
      this.$axios({
        methods: 'get',
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
        },
        url: 'http://localhost:3000/api/user/getFavs'
      }).then((response) => {
        // TODO => Implement the api response
      })
    },
    goAdminPanel () {
      this.$router.push('/admin-panel')
    }
  },
  computed: {
    enableSearch () {
      return this.search === ''
    }
  }
}
</script>
