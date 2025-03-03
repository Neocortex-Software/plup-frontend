<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md shadow-2 my_card" flat bordered>
      <q-card-section class="text-center">
        <img src="~assets/logo.svg" width="128" alt="">
        <div class="text-black text-h5 text-weight-medium">App</div>
      </q-card-section>

      <div v-if="!emailSent">
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h6 text-weight-normal">{{ $t('resetPassword') }}</div>
          <div class="text-grey-8">{{ $t('forgotPasswordSubtitle') }}</div>
        </q-card-section>
        <q-form @submit.prevent="onSubmit">
          <q-card-section class="q-gutter-y-md">
            <q-input type="email" outlined v-model="email" :label="$t('email')"
              :rules="[RULES.required, RULES.email]"></q-input>
            <q-btn type="submit" color="primary" :loading="loading" :label="$t('send')" no-caps
              class="full-width"></q-btn>
          </q-card-section>
        </q-form>
      </div>
      <q-card-section v-else class="text-center">
        <q-icon name="check_circle_outline" color="positive" size="3em"></q-icon>
        <div class="text-grey-9 text-h6 text-weight-normal">{{ $t('emailSent') }}</div>
        <div class="text-grey-8">{{ $t('emailSentMessage') }}</div>
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <RouterLink :to="{ name: 'login' }" class="text-primary text-weight-bold text-decoration-none">
          {{ $t('goBack') }}
        </RouterLink>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/modules/auth/stores/auth-store';
import { RULES } from 'src/utils/validations';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

defineOptions({
  name: 'ForgotPasswordPage'
});

const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);

const email = ref('');
const emailSent = ref(false);

const onSubmit = async () => {
  await authStore.forgotPassword(email.value)
    .then(() => {
      emailSent.value = true;
    });
}
</script>
<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  /* box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); */
}
</style>