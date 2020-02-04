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
        <!-- Fav list -->
        <q-item>
          <q-item-section>
            <div class="text-subtitle2">{{$t('global_page.drawer.tools.fav_title')}}</div>
            <q-list v-if="isUserLogged">
              <fav-list :favs="favs"/>
            </q-list>
            <q-item v-else>
              <div>{{$t('messages.have_to_login_to_fav')}}</div>
            </q-item>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-dialog
        v-model="openIt"
        :maximized="maximizedModal"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <div>
          <!-- Call the good modal -->
          <crypto-modal :crypto_id="id" v-if="modalToOpen === 'crypto-modal'"/>
          <invalid-token-pop-up v-if="modalToOpen === 'invalid_token'"/>
        </div>
      </q-dialog>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import MyAccount from '../components/generalComponants/MyAccount'
import CryptoModal from '../components/Popup/cryptoModal'
import FavList from '../components/generalComponants/favList'
import InvalidTokenPopUp from '../components/Popup/InvalidTokenModal'
export default {
  name: 'MyLayout',
  components: { InvalidTokenPopUp, FavList, CryptoModal, MyAccount },
  data () {
    return {
      leftDrawerOpen: true,
      langs: [],
      lang: this.$i18n.locale,
      search: '',
      favs: [],
      showMyAccount: false,
      isUserLogged: false,
      showAdminPanel: false,
      openIt: false,
      modalToOpen: '',
      id: null
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
    // Set different listeners
    this.$root.$on('close-modal', this.closeModal)
    this.$root.$on('user-logged', this.userLogAction)
    this.$root.$on('user-logout', this.userLogAction)
    this.$root.$on('openModal', this.openModal)
    this.$root.$on('fav-updated', this.getFavList)
    this.$root.$on('token-invalid', this.invalidToken)
  },
  methods: {
    invalidToken () {
      this.$root.$emit('openModal', ['invalid_token'])
      // Remove tokens
      this.$q.localStorage.remove('jwt')
      this.$q.localStorage.remove('admin')
      this.userLogout()
    },
    closeModal () {
      this.modalToOpen = ''
      this.id = null
      this.openIt = false
    },
    openModal (props) {
      this.modalToOpen = props[0]
      this.id = props[1]
      this.openIt = true
    },
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
        this.favs = response.data.list
      }).catch((error) => {
        // Test if the token isn't valid
        if (error.response.data.message === 'Invalid token') {
          this.$root.$emit('token-invalid')
        }
      })
    },
    goAdminPanel () {
      this.$router.push('/admin-panel')
    }
  },
  computed: {
    maximizedModal () {
      return this.modalToOpen !== 'invalid_token'
    }
  }
}
</script>
