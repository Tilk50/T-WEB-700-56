<template>
 <div>
   <q-card v-if="crypto">
     <q-card-section
        class="bg-primary text-white"
     >
       <div class="text-h6">{{crypto.name}} - {{crypto.symbol}}</div>
     </q-card-section>
     <q-separator/>
     <!-- Display the crypto datas -->
     <q-card-section>
       <div class="row">
         <!-- Display global data -->
         <div class="col-6">
           <div class="row">
             <span class="text-bold col-6">{{$t('labels.crypto_object.actual_price')}}</span>
             <span class="text-bold col-6">{{$t('labels.crypto_object.market_cap')}}</span>
           </div>
           <div class="row">
             <span class="col-6">{{crypto.price}}</span>
             <span class="col-6">{{crypto.market_cap}}</span>
           </div>
         </div>
         <!-- Display the crypto price evolution -->
         <div class="col-6">
           <span class="text-subtitle1 col-12">{{$t('labels.price_evolution')}}</span>
           <q-separator/>
           <div class="row">
             <span class="text-bold col-6">{{$t('labels.crypto_object.percent_change_1H')}}</span>
             <crypto-statut class="col-6" :cryptoChange="crypto.percent_change_1H"/>
           </div>
           <div class="row">
             <span class="text-bold col-6">{{$t('labels.crypto_object.percent_change_24H')}}</span>
             <crypto-statut class="col-6" :cryptoChange="crypto.percent_change_24H"/>
           </div>
           <div class="row">
             <span class="text-bold col-6">{{$t('labels.crypto_object.percent_change_7D')}}</span>
             <crypto-statut class="col-6" :cryptoChange="crypto.percent_change_7D"/>
           </div>
         </div>
       </div>
     </q-card-section>
     <q-separator/>
     <q-card-section class="row">
       <q-btn
         class="col-3 offset-4"
         color="negative"
         icon="clear"
         :label="$t('labels.close')"
         @click="closeModal"
       />
     </q-card-section>
   </q-card>
 </div>
</template>

<script>
import CryptoStatut from '../cryptoComponant/cryptoStatut'
export default {
  name: 'cryptoModal',
  components: { CryptoStatut },
  props: ['crypto_id'],
  data () {
    return {
      crypto: null
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
      })
    },
    closeModal () {
      this.$root.$emit('close-modal')
    }
  }
}
</script>

<style scoped>

</style>
