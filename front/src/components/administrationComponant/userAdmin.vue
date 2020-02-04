<template>
  <div class="row">
    <user-list class="col-12"/>
  </div>
</template>

<script>
import UserList from './userList'
export default {
  name: 'userAdmin',
  components: { UserList }
}
</script>

<style scoped>

</style>
