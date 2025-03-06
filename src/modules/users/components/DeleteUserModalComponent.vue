<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">{{ $t('deleteUser') }}</div>
            </q-card-section>

            <q-card-section>
                {{ $t('deleteUserMessage') }}
            </q-card-section>

            <q-card-actions align="right">
                <q-btn type="submit" unelevated no-caps color="red" :label="$t('delete')" @click="onOKClick" />
                <q-btn unelevated no-caps color="primary" :label="$t('cancel')" @click="onDialogCancel" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { User } from '../models/user.model';
import { useUserStore } from '../stores/user-store';

const userStore = useUserStore();

const props = defineProps<{
    user: User;
}>();

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
    await userStore.deleteUser(props.user.id);
    // on OK, it is REQUIRED to
    // call onDialogOK (with optional payload)
    onDialogOK();
    // or with payload: onDialogOK({ ... })
    // ...and it will also hide the dialog automatically
}
</script>