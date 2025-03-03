<template>
  <q-layout view="hHh Lpr fFf">

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AuthLayout'
})
</script>
