<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">{{ $t('editUser') }}</div>
            </q-card-section>

            <q-form @submit.prevent.stop="onOKClick">
                <q-card-section class="q-gutter-sm">
                    <q-input outlined v-model="editableUser.firstName" :label="$t('firstName')"
                        :rules="[RULES.required]" />
                    <q-input outlined v-model="editableUser.lastName" :label="$t('lastName')"
                        :rules="[RULES.required]" />
                    <q-input outlined v-model="editableUser.email" :label="$t('email')" :rules="[RULES.email]" />
                    <q-input class="q-pb-md" outlined v-model="editableUser.password"
                        :type="isPwd ? 'password' : 'text'" :label="$t('password')">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                    <q-input outlined v-model="editableUser.confirmPassword" :type="isPwdConfirm ? 'password' : 'text'"
                        :label="$t('confirmPassword')" :rules="[sameAsPasswordRule]">
                        <template v-slot:append>
                            <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwdConfirm = !isPwdConfirm" />
                        </template>
                    </q-input>
                    <q-select outlined v-model="editableUser.roleId" :options="roleSelect" :label="$t('role')"
                        emit-value map-options />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn type="submit" unelevated no-caps color="primary" :label="$t('saveChanges')" />
                    <q-btn unelevated no-caps color="primary" :label="$t('cancel')" @click="onDialogCancel" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { RULES } from 'src/utils/validations';
import { computed, reactive, ref } from 'vue';
import { UpdateUser } from '../models/update-user.model';
import { useUserStore } from '../stores/user-store';

const userStore = useUserStore();

const props = defineProps<{
    user: UpdateUser; // La prop que recibimos
}>();

const editableUser = reactive({ ...props.user });

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
const sameAsPasswordRule = computed(() => RULES.sameAs(editableUser.password));

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
    await userStore.updateUser(editableUser.id, editableUser); // Llamar a la función de actualización
    // on OK, it is REQUIRED to
    // call onDialogOK (with optional payload)
    onDialogOK(editableUser);
    // or with payload: onDialogOK({ ... })
    // ...and it will also hide the dialog automatically
}
</script>