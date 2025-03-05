<template>
  <q-page padding>
    <UsersTableComponent></UsersTableComponent>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import UsersTableComponent from '../components/UsersTableComponent.vue';

defineComponent({
  name: 'UsersPage'
})

</script>
