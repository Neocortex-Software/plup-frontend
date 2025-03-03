<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md shadow-2 my_card" flat bordered>
      <q-card-section class="text-center">
        <img src="~assets/logo.svg" width="64" alt="" />
        <div class="text-black text-h5 text-weight-medium">App</div>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h6 text-weight-normal">
          {{ $t('signUp') }}
        </div>
        <div class="text-grey-8">{{ $t('signUpSubtitle') }}</div>
      </q-card-section>
      <q-form @submit.prevent="authStore.handleSignUp(userSignUp)">
        <q-card-section class="q-gutter-y-md">
          <q-input outlined v-model="userSignUp.firstName" :label="$t('firstName')" :rules="[RULES.required]" />
          <q-input outlined v-model="userSignUp.lastName" :label="$t('lastName')" :rules="[RULES.required]" />
          <q-input outlined v-model="userSignUp.email" :label="$t('email')" :rules="[RULES.required, RULES.email]" />
          <q-input outlined v-model="userSignUp.password" :type="isPwd ? 'password' : 'text'" :label="$t('password')"
            :rules="[RULES.required]">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input outlined v-model="userSignUp.confirmPassword" :type="isPwdConfirm ? 'password' : 'text'"
            :label="$t('confirmPassword')" :rules="[RULES.required, sameAsPasswordRule]">
            <template v-slot:append>
              <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwdConfirm = !isPwdConfirm" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-btn type="submit" :loading="loading" color="primary" :label="$t('createAccount')" class="full-width" />
        </q-card-section>
      </q-form>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8">
          {{ $t('alreadyHaveAnAccount') }}
          <RouterLink :to="{ name: 'login' }" class="text-primary text-weight-bold" style="text-decoration: none">{{
            $t('signInAlt') }}.
          </RouterLink>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { UserSignUp } from 'src/modules/auth/models/user-signup.model';
import { useAuthStore } from 'src/modules/auth/stores/auth-store';
import { RULES } from 'src/utils/validations';
import { computed, ref } from 'vue';

defineOptions({
  name: 'RegisterPage',
});

const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);
const isPwd = ref(true);
const isPwdConfirm = ref(true);

const userSignUp = ref<UserSignUp>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const sameAsPasswordRule = computed(() => {
  return RULES.sameAs(userSignUp.value.password);
});
</script>
<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  /* box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); */
}
</style>
