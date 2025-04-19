<template>
    <q-tabs no-caps active-color="primary" align="justify" class="bg-white text-primary">
        <q-route-tab :to="{ name: 'received-giftcards' }" label="Recibidas" />
        <q-route-tab :to="{ name: 'sent-giftcards' }" label="Enviadas" />
    </q-tabs>
    <router-view />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" @click="openCreateModal()" />
    </q-page-sticky>
</template>
<script setup lang="ts">
import { Dialog } from 'quasar';
import CreateGiftCardModal from '/src/modules/giftcards/components/CreateGiftCardModal.vue';

function openCreateModal() {
    Dialog.create({
        component: CreateGiftCardModal,
    }).onOk(async () => {
        console.log('OK');
    }).onCancel(() => {
        console.log('Cancel')
    }).onDismiss(() => {
        console.log('Called on OK or Cancel')
    })
}
</script>