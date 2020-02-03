<template>
    <q-card>
      <q-card-section
        class="bg-primary text-white"
      >
        <div class="text-h6">{{$t('labels.crypto_list')}}</div>
      </q-card-section>
      <q-card-section>
        <q-table
          binary-state-sort
          row-key="id"
          :data="data"
          :columns="columns"
          @request="beforeRequest"
          :pagination.sync="pagination"
        >
          <!-- Template for the filter bar in the list -->
          <template v-slot:top-row>
            <q-tr>
              <q-td v-for="(col, index) in columns" :key="index">
                <q-input v-if="col.search === true" dense v-model="filter[col.name]">
                  <template v-slot:prepend>
                    <q-icon name="search"/>
                  </template>
                </q-input>
                <!-- Template to filter by the status -->
                <div v-if="col.name === 'percent_change_1H' || col.name === 'percent_change_24H' || col.name === 'percent_change_7D'">
                  <q-select
                    filled
                    v-model="filter[col.name]"
                    :options="options"
                    option-value="value"
                    option-label="label"
                    emit-value
                    map-options
                  >
                    <!-- Template to display different options -->
                    <template v-slot:option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        v-on="scope.itemEvents"
                      >
                        <q-item-section v-if="scope.opt.icon" avatar>
                          <q-icon
                            :name="scope.opt.icon"
                            :color="scope.opt.color"
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label v-html="scope.opt.label"/>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </q-td>
            </q-tr>
          </template>
          <!-- Template for each line -->
          <template v-slot:body="props">
            <q-tr
              :props="props"
              @click.native="getRow(props.row)" class="cursor-pointer"
            >
              <q-td
                :auto-width="true"
                v-for="(col2, index2) in columns"
                :key="index2"
              >
                <q-toggle v-if="col2.name === 'show_in_list'"
                  v-model="props.row.show_in_list"
                  @click.native="showOrHide(props.row)"
                />
                <div v-else-if="col2.name === 'percent_change_1H' || col2.name === 'percent_change_24H' || col2.name === 'percent_change_7D'">
                    <crypto-statut :cryptoChange="props.row[col2.name]"/>
                </div>
                <div v-else>{{props.row[col2.name]}}</div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
</template>

<script>
import CryptoStatut from './cryptoStatut'
let timerWatch = null
export default {
  name: 'cryptoList',
  components: { CryptoStatut },
  props: ['admin'],
  data () {
    return {
      data: [],
      columns: [
        { name: 'name', label: this.$t('labels.crypto_object.name'), field: 'name', sortable: true, search: true },
        { name: 'symbol', label: this.$t('labels.crypto_object.symbol'), field: 'symbol', sortable: true, search: true },
        { name: 'price', label: this.$t('labels.crypto_object.actual_price'), field: 'price', sortable: true, search: false },
        { name: 'percent_change_1H', label: this.$t('labels.crypto_object.percent_change_1H'), sortable: true, search: false },
        { name: 'percent_change_24H', label: this.$t('labels.crypto_object.percent_change_24H'), sortable: true, search: false },
        { name: 'percent_change_7D', label: this.$t('labels.crypto_object.percent_change_7D'), sortable: true, search: false }
      ],
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 0
      },
      filter: {},
      options: [
        { value: null, label: '-' },
        { value: 'down', icon: 'trending_down', color: 'red', label: 'WALLAH C\'EST LA DECHE' },
        { value: 'flat', icon: 'trending_flat', color: 'orange', label: 'COUSSI COUSSA' },
        { value: 'up', icon: 'trending_up', color: 'green', label: 'POULOULOU CA GRIMPE' }
      ]
    }
  },
  mounted () {
    // Load data
    this.loadData()
    // Test if the user if admin
    if (typeof this.admin !== 'undefined' && this.admin) {
      this.columns.push({
        name: 'show_in_list',
        label: this.$t('labels.crypto_object.show_in_list'),
        sortable: true,
        search: false
      })
    }
  },
  methods: {
    loadData () {
      console.log(this.filter)
      // Set default filter to display or no the hided crypto
      if (typeof this.admin === 'undefined' || this.admin === false) {
        this.filter.show_in_list = true
      }
      this.$axios({
        method: 'get',
        url: 'http://localhost:3000/api/cryptos',
        params: {
          startRow: (this.pagination.page - 1) * this.pagination.rowsPerPage,
          rowsRequest: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          desc: (this.pagination.descending ? -1 : 1),
          filter: this.filter
        }
      }).then((response) => {
        this.data = response.data.list
        this.pagination.rowsNumber = response.data.totalRow
      })
    },
    // Method called before api request
    beforeRequest (props) {
      // Define pagination properties
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending
      this.pagination.rowsNumber = rowsNumber
      // Test if user is admin to display all row or not
      this.loadData()
    },
    getRow (row) {
      this.$root.$emit('openModal', ['crypto-modal', row._id])
    },
    showOrHide (row) {
      this.$axios({
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
        },
        url: 'http://localhost:3000/api/admin/hide-crypto/' + row._id
      })
    }
  },
  watch: {
    'filter': {
      handler: function (val) {
        if (timerWatch !== null) {
          clearTimeout(timerWatch)
        }
        timerWatch = setTimeout(() => {
          this.loadData()
        }, 500)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
