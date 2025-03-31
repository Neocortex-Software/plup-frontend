<template>
  <q-page padding>
    <q-btn @click="authStore.handleLogout()" label="Cerrar sesión" color="red" class="full-width" />
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/modules/auth/stores/auth-store';

defineOptions({
  name: 'IndexPage'
});

const authStore = useAuthStore();
</script>
