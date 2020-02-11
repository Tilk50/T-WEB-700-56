<template>
  <q-card>
    <q-card-section>
      <span class="text-h6">{{$t('labels.account_identity')}}</span>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <div class="row">
        <span class="col-6 text-bold">{{$t('labels.user_object.email')}}:</span>
        <span class="col-6">{{user.email}}</span>
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-actions class="justify-around">
      <q-btn
        color="primary"
        icon="edit"
        :label="$t('labels.edit_my_infos')"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: ['user'],
  name: 'globalInformations'
}
</script>

<style scoped>

</style>
