<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md shadow-2 my_card" flat bordered>
      <q-card-section class="text-center">
        <img src="~assets/logo.svg" width="128" alt="">
        <div class="text-black text-h5 text-weight-medium">Plup</div>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h6 text-weight-normal">{{ t('signIn') }}</div>
        <div class="text-grey-8">{{ t('signInSubtitle') }}</div>
      </q-card-section>
      <q-form @submit.prevent="authStore.handleSignIn(userSignIn)">
        <q-card-section class="q-gutter-y-md">
          <q-input outlined v-model="userSignIn.email" :label="t('email')"
            :rules="[RULES.required, RULES.email]"></q-input>
          <q-input outlined v-model="userSignIn.password" :type="isPwd ? 'password' : 'text'" :label="t('password')"
            :rules="[RULES.required]">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn type="submit" color="primary" :loading="loading" :label="t('signIn')" no-caps
            class="full-width"></q-btn>
          <SignInGoogleButton></SignInGoogleButton>
        </q-card-section>
      </q-form>
      <q-card-section class="text-center q-pt-none q-gutter-y-sm">
        <div class="text-grey-8">{{ t('dontHaveAnAccountYet') }}
          <RouterLink :to="{ name: 'register' }" class="text-primary text-weight-bold text-decoration-none">
            {{ t('register') }}.</RouterLink>
        </div>
        <div>
          <RouterLink :to="{ name: 'forgot-password' }" class="text-primary text-decoration-none">{{
            t('forgotPassword') }}</RouterLink>
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { UserSignIn } from 'src/modules/auth/models/user-signin.model';
import { useAuthStore } from 'src/modules/auth/stores/auth-store';
import { RULES } from 'src/utils/validations';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import SignInGoogleButton from '../components/SignInGoogleButton.vue';

defineOptions({
  name: 'LoginPage'
});

const { t } = useI18n();

const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);

const isPwd = ref(true);

const userSignIn = ref<UserSignIn>({
  email: '',
  password: ''
});

</script>
<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  /* box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); */
}
</style>