<template>
  <q-card>
    <q-card-section
      class="bg-primary text-white"
    >
      <div class="text-h6">{{$t('labels.user_list')}}</div>
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
              <div v-if="col2.name === 'actions'">
                <q-btn
                  color="negative"
                  icon="delete"
                  @click="deleteUser(props.row)"
                />
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
let timerWatch = null
export default {
  name: 'userList',
  data () {
    return {
      data: [],
      columns: [
        { name: 'email', label: this.$t('labels.user_object.email'), field: 'email', sortable: true, search: true },
        { name: 'admin', label: this.$t('labels.user_object.is_admin'), field: 'admin', sortable: true, search: false },
        { name: 'actions', label: this.$t('global_page.label.actions'), field: 'actions', sortable: false, search: false }
      ],
      pagination: {
        sortBy: 'email',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 0
      },
      filter: {}
    }
  },
  mounted () {
    // Load data
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios({
        method: 'get',
        url: 'http://localhost:3000/api/admin/user',
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
        },
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
      console.log(row)
    },
    deleteUser (row) {
      this.$q.dialog({
        title: this.$t('global_page.label.warning'),
        message: this.$t('global_page.confirm_dialog.delete_user')
      }).onOk(() => {
        this.$axios({
          method: 'delete',
          headers: {
            Authorization: 'Bearer ' + this.$q.localStorage.getItem('jwt')
          },
          url: 'http://localhost:3000/api/admin/user/' + row._id
        }).then(() => {
          this.loadData()
        })
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
