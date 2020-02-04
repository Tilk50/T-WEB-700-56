<template>
 <div>
   <q-card v-if='crypto'>
     <q-card-section
        class='bg-primary text-white'
     >
       <div class='text-h6'>{{crypto.name}} - {{crypto.symbol}}</div>
     </q-card-section>
     <q-separator/>
     <!-- Display the crypto datas -->
     <q-card-section>
       <div class='row'>
         <!-- Display global data -->
         <div class='col-6'>
           <div class='row'>
             <span class='text-bold col-6'>{{$t('labels.crypto_object.actual_price')}}</span>
             <span class='text-bold col-6'>{{$t('labels.crypto_object.market_cap')}}</span>
           </div>
           <div class='row'>
             <span class='col-6'>{{crypto.price}}</span>
             <span class='col-6'>{{crypto.market_cap}}</span>
           </div>
         </div>
         <!-- Display the crypto price evolution -->
         <div class='col-6'>
           <span class='text-subtitle1 col-12'>{{$t('labels.price_evolution')}}</span>
           <q-separator/>
           <div class='row'>
             <span class='text-bold col-6'>{{$t('labels.crypto_object.percent_change_1H')}}</span>
             <crypto-statut class='col-6' :cryptoChange='crypto.percent_change_1H'/>
           </div>
           <div class='row'>
             <span class='text-bold col-6'>{{$t('labels.crypto_object.percent_change_24H')}}</span>
             <crypto-statut class='col-6' :cryptoChange='crypto.percent_change_24H'/>
           </div>
           <div class='row'>
             <span class='text-bold col-6'>{{$t('labels.crypto_object.percent_change_7D')}}</span>
             <crypto-statut class='col-6' :cryptoChange='crypto.percent_change_7D'/>
           </div>
         </div>
       </div>
     </q-card-section>
     <q-card-section v-if="showDiagram">
        <chart-manager
          :title="$t('labels.price_chart')"
          :cols='colones'
          :getUrl="'http://localhost:3000/api/price/get-from-crypto/' + crypto._id"
          :type="'XY-chart'"
          :legende="true"
          :xLabel="xLabel"
          :yLabel="yLabel"
        />
     </q-card-section>
     <q-separator/>
     <q-card-actions class='justify-around'>
       <q-btn
         v-if="showDiagram"
         icon="clear"
         :label="$t('labels.hide_diagrams')"
         @click="showDiagram = false"
         color="secondary"
       />
       <q-btn
         color='primary'
         v-if="!showDiagram"
         icon="bar_chart"
         :label="$t('labels.show_diagrams')"
         @click='showDiagram = true'
       />
       <q-btn
         v-if="canAddToFav"
         color="info"
         icon="favorite"
         :label="$t('labels.add_fav')"
         @click="addToFav"
       />
       <q-btn
         v-if="isInFav"
         color="warning"
         icon="block"
         :label="$t('labels.remove_fav')"
         @click="removeFromFav"
       />
       <q-btn
         color="negative"
         icon="clear"
         :label="$t('labels.close')"
         @click="closeModal"
       />
     </q-card-actions>
   </q-card>
 </div>
</template>

<script>
import CryptoStatut from '../cryptoComponant/cryptoStatut'
import ChartManager from '../charts/chartManager'
export default {
  name: 'cryptoModal',
  components: { ChartManager, CryptoStatut },
  props: ['crypto_id'],
  data () {
    return {
      crypto: null,
      showDiagram: false,
      isInFav: false,
      colones: [
        {
          field: 'date',
          label: 'Date'
        },
        {
          field: 'value',
          label: 'Valeure'
        }
      ],
      xLabel: 'Date',
      yLabel: 'Valeure'
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios({
        method: 'get',
        url: 'http://localhost:3000/api/cryptos/' + this.crypto_id
      }).then((response) => {
        this.crypto = response.data.crypto
        // Test if user is logged
        if (this.$q.localStorage.has('jwt')) {
          this.testFavCrypto()
        }
      })
    },
    closeModal () {
      this.$root.$emit('close-modal')
    },
    addToFav () {
      this.$axios({
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
        },
        url: 'http://localhost:3000/api/crypto/add-to-fav/' + this.crypto_id
      }).then((response) => {
        this.loadData()
        this.updateFav()
      })
    },
    testFavCrypto () {
      this.$axios({
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
        },
        url: 'http://localhost:3000/api/crypto/is-in-fav/' + this.crypto_id
      }).then((response) => {
        this.isInFav = response.data.isInFav
      })
    },
    removeFromFav () {
      this.$axios({
        method: 'delete',
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
        },
        url: 'http://localhost:3000/api/crypto/remove-fav/' + this.crypto_id
      }).then((response) => {
        this.loadData()
        this.updateFav()
      })
    },
    updateFav () {
      this.$root.$emit('fav-updated')
    }
  },
  computed: {
    canAddToFav () {
      return this.$q.localStorage.has('jwt') && !this.isInFav
    }
  }
}
</script>

<style scoped>

</style>
