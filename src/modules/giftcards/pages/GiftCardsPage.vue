<template>
    <q-tabs no-caps active-color="primary" align="justify" class="bg-white text-primary">
        <q-route-tab :to="{ name: 'received-giftcards' }" label="Recibidas" />
        <q-route-tab :to="{ name: 'sent-giftcards' }" label="Enviadas" />
    </q-tabs>
    <router-view />
    <q-page-sticky position="bottom-right" :offset="[18, 18]" @click="sendGiftcard()">
        <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
</template>
<script setup lang="ts">

function sendGiftcard() {
    console.log('Send giftcard clicked');
}
</script>