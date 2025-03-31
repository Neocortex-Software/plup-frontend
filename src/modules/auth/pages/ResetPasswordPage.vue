<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md shadow-2 my_card" flat bordered>
      <q-card-section class="text-center">
        <img src="~assets/logo.svg" width="128" alt="">
        <div class="text-black text-h5 text-weight-medium">Plup</div>
      </q-card-section>

      <q-card-section class="text-center">
        <div class="text-grey-9 text-h6 text-weight-normal">{{ t('resetPassword') }}</div>
        <div class="text-grey-8">{{ t('resetPasswordSubtitle') }}</div>
      </q-card-section>
      <q-form @submit.prevent="onSubmit">
        <q-card-section class="q-gutter-y-md">
          <q-input outlined v-model="form.newPassword" :type="isNewPwd ? 'password' : 'text'" :label="t('newPassword')"
            :rules="[RULES.required, RULES.minLength(6)]">
            <template v-slot:append>
              <q-icon :name="isNewPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isNewPwd = !isNewPwd" />
            </template>
          </q-input>
          <q-input outlined v-model="form.confirmPassword" :type="isPwdConfirm ? 'password' : 'text'"
            :label="t('confirmPassword')" :rules="[RULES.required, RULES.minLength(6), sameAsPasswordRule]">
            <template v-slot:append>
              <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwdConfirm = !isPwdConfirm" />
            </template>
          </q-input>
          <q-btn type="submit" color="primary" :loading="loading" :label="t('saveChanges')" no-caps
            class="full-width"></q-btn>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/modules/auth/stores/auth-store';
import { RULES } from 'src/utils/validations';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

defineOptions({
  name: 'ForgotPasswordPage'
});

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const token = route.params.token as string;

const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);
const isNewPwd = ref(true);
const isPwdConfirm = ref(true);

const form = ref({
  newPassword: '',
  confirmPassword: '',
});

const onSubmit = async () => {
  await authStore.resetPassword(token, form.value.newPassword)
    .then(() => {
      router.push({ name: 'login' });
    });
}

const sameAsPasswordRule = computed(() => {
  return RULES.sameAs(form.value.newPassword);
});
</script>
<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  /* box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); */
}
</style>