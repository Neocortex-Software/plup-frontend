<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">User Create</div>
            </q-card-section>

            <q-form @submit.prevent.stop="onOKClick" class="q-gutter-md">
                <q-card-section>
                    <q-input outlined v-model="user.firstName" :label="$t('firstName')" :rules="[RULES.required]" />
                    <q-input outlined v-model="user.lastName" :label="$t('lastName')" :rules="[RULES.required]" />
                    <q-input outlined v-model="user.email" :label="$t('email')"
                        :rules="[RULES.required, RULES.email]" />
                    <q-input outlined v-model="user.password" :type="isPwd ? 'password' : 'text'"
                        :label="$t('password')" :rules="[RULES.required]">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                    <q-input outlined v-model="user.confirmPassword" :type="isPwdConfirm ? 'password' : 'text'"
                        :label="$t('confirmPassword')" :rules="[RULES.required, sameAsPasswordRule]">
                        <template v-slot:append>
                            <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwdConfirm = !isPwdConfirm" />
                        </template>
                    </q-input>
                    <q-select outlined v-model="user.role" :options="roleSelect" :label="$t('role')" emit-value
                        map-options />
                </q-card-section>

                <!-- buttons example -->
                <q-card-actions align="right">
                    <q-btn type="submit" unelevated color="primary" :label="$t('accept')" />
                    <q-btn unelevated color="primary" :label="$t('cancel')" @click="onDialogCancel" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { RULES } from 'src/utils/validations';
import { computed, ref } from 'vue';
import { CreateUser } from '../models/create-user.model';
import { useUserStore } from '../stores/user-store';

const userStore = useUserStore();

const user = ref<CreateUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 2
});

const roleSelect = [
    {
        label: 'Administrator',
        value: 2,
    },
    {
        label: 'User',
        value: 3,
    },
]

const isPwd = ref(true);
const isPwdConfirm = ref(true);
const sameAsPasswordRule = computed(() => {
    return RULES.sameAs(user.value.password);
});

defineEmits([
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
async function onOKClick() {
    const createdUser = await userStore.createUser(user.value);
    // on OK, it is REQUIRED to
    // call onDialogOK (with optional payload)
    onDialogOK(createdUser);
    // or with payload: onDialogOK({ ... })
    // ...and it will also hide the dialog automatically
}
</script>