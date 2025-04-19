<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">{{ t('sendGiftCard') }}</div>
            </q-card-section>

            <q-form @submit.prevent.stop="onOKClick">
                <q-card-section class="q-gutter-sm">
                    <div>{{ t('messageSubtitle') }}</div>
                    <q-input type="textarea" outlined v-model="giftCard.message" :label="t('message')" />
                    <div>{{ t('emailSubtitle') }}</div>
                    <q-input type="email" outlined v-model="giftCard.recipientEmail" :label="t('email')" />
                    <div>{{ t('currencySubtitle') }}</div>
                    <q-select outlined v-model="giftCard.currency" :options="currencies" :label="t('currency')"
                        emit-value map-options />
                    <div>{{ t('valueSubtitle') }}</div>
                    <q-input type="number" prefix="$" outlined v-model="giftCard.value" :label="t('value')" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn type="submit" unelevated no-caps color="primary" :label="t('sendGiftCard')"
                        class="full-width" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useAuthStore } from 'src/modules/auth/stores/auth-store';
import { CreateGiftCard } from 'src/modules/giftcards/models/create-giftcard.model';
import { useGiftCardStore } from 'src/modules/giftcards/stores/giftcard-store';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const authStore = useAuthStore();
const currentUser = authStore.currentUser;

const giftCardStore = useGiftCardStore();

const giftCard = ref<CreateGiftCard>(
    {
        issuerId: currentUser.id,
        recipientId: 0,
        recipientEmail: '',
        establishmentId: 0,
        message: '',
        value: 0,
        currency: '',
        expirationDate: new Date(),
        active: false
    }
);

const currencies = ref([
    { label: 'ARS', value: 'ARS' },
    { label: 'USD', value: 'USD' }
]);

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
    const createdGiftCard = await giftCardStore.createGiftCard(giftCard.value);
    // on OK, it is REQUIRED to
    // call onDialogOK (with optional payload)
    onDialogOK(createdGiftCard);
    // or with payload: onDialogOK({ ... })
    // ...and it will also hide the dialog automatically
}
</script>