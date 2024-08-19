<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md shadow-2 my_card" flat bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Sign up</div>
        <div class="text-grey-8">Sign up below to create your account</div>
      </q-card-section>
      <q-card-section>
        <q-input outlined v-model="userSignUp.firstName" label="First name" :rules="[RULES.required]" />
        <q-input outlined v-model="userSignUp.lastName" label="Last name" :rules="[RULES.required]" />
        <q-input outlined v-model="userSignUp.email" label="Email" :rules="[RULES.required, RULES.email]" />
        <q-input outlined v-model="userSignUp.password" :type="isPwd ? 'password' : 'text'" label="Password"
          :rules="[RULES.required]">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-input outlined v-model="userSignUp.confirmPassword" :type="isPwdConfirm ? 'password' : 'text'"
          label="Confirm password" :rules="[RULES.required, sameAsPasswordRule]">
          <template v-slot:append>
            <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'" class="cursor-pointer"
              @click="isPwdConfirm = !isPwdConfirm" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-btn @click="register" :disable="!isFormValid" :loading="loading" color="primary" label="Sign up" no-caps
          class="full-width" />
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8">Already have an account?
          <RouterLink to="/auth" class="text-primary text-weight-bold" style="text-decoration: none">Sign in.
          </RouterLink>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { UserSignUp } from 'src/models/user-signup.model';
import { useAuthStore } from 'src/stores/auth-store';
import { RULES } from 'src/utils/validations';
import { computed, ref } from 'vue';

defineOptions({
  name: 'RegisterPage'
});

const $q = useQuasar();
const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);
const isPwd = ref(true);
const isPwdConfirm = ref(true);
const errorMessage = ref<string | null>(null);

const userSignUp = ref<UserSignUp>({
  firstName: 'louie',
  lastName: 'codes',
  email: 'louie@codes.com',
  password: '123456',
  confirmPassword: '123456',
});

const sameAsPasswordRule = computed(() => {
  return RULES.sameAs(userSignUp.value.password, 'Passwords must match');
});

const isFormValid = computed(() => {
  return RULES.required(userSignUp.value.firstName) === true &&
    RULES.required(userSignUp.value.lastName) === true &&
    RULES.required(userSignUp.value.email) === true &&
    RULES.email(userSignUp.value.email) === true &&
    RULES.required(userSignUp.value.password) === true &&
    RULES.required(userSignUp.value.confirmPassword) === true &&
    userSignUp.value.password === userSignUp.value.confirmPassword;
});

const register = async () => {
  if (isFormValid.value) {
    try {
      await authStore.signUp(userSignUp.value);
      // Redireccionar o mostrar éxito
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