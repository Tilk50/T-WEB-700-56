<template>
    <q-card>
      <q-card-section
        class="bg-warning text-white"
      >
        <div class="text-h6">{{$t('errors.title')}}</div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <div class="text-center">
          {{$t('errors.invalid_token')}}
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: 'InvalidTokenPopUp'
}
</script>

<style scoped>

</style>
