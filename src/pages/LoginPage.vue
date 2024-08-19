<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md shadow-2 my_card" flat bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
        <div class="text-grey-8">Sign in below to access your account</div>
      </q-card-section>
      <q-card-section>
        <q-input outlined v-model="userSignIn.email" label="Email Address"
          :rules="[RULES.required, RULES.email]"></q-input>
        <q-input outlined class="q-mt-md" v-model="userSignIn.password" :type="isPwd ? 'password' : 'text'"
          label="Password" :rules="[RULES.required]">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-btn @click="login" color="primary" :disable="!isFormValid" :loading="loading" label="Sign in" no-caps
          class="full-width"></q-btn>
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8">Don't have an account yet?
          <RouterLink to="/auth/register" class="text-primary text-weight-bold" style="text-decoration: none">Sign
            up.</RouterLink>
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { UserSignIn } from 'src/models/user-signin.model';
import { useAuthStore } from 'src/stores/auth-store';
import { RULES } from 'src/utils/validations';
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

defineOptions({
  name: 'LoginPage'
});

const $q = useQuasar();
const router = useRouter();
const isPwd = ref(true);
const errorMessage = ref<string | null>(null);
const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);
const userSignIn = ref<UserSignIn>({
  email: 'louie@codes.com',
  password: '123456',
});

const isFormValid = computed(() => {
  return RULES.required(userSignIn.value.email) === true &&
    RULES.email(userSignIn.value.email) === true &&
    RULES.required(userSignIn.value.password) === true;
});

const login = async () => {
  try {
    await authStore.signIn(userSignIn.value);
    router.push({ name: 'home' });
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again later.';
    }
    $q.notify({
      type: 'negative',
      message: errorMessage.value
    });
  }
};

</script>
<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  /* box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); */
}
</style>