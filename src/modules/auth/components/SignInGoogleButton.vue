<template>
    <q-btn type="button" no-caps @click="authStore.loginWithGoogle()" label="Iniciar sesión con Google" color="red"
        class="full-width" icon="mdi-google" />
</template>
<script setup lang="ts">
import { useAuthStore } from '../stores/auth-store';

const authStore = useAuthStore();
</script>