<template>
    <q-page padding>
        <div class="text-h6 q-pb-md">{{ t('myGiftcards') }}</div>
        <div></div>

        <div class="row justify-center items-center">
            <q-card class="my-card col-12 col-sm-6 col-md-4 col-lg-3 q-mb-md">
                <q-card-section class="q-pa-md">
                    <div class="text-h6 q-mb-md">Gift Card 1</div>
                    <div class="text-subtitle2 q-mb-md">Descripción de la gift card 1</div>
                    <q-btn no-caps unelevated :label="t('redeemGiftcard')" color="primary" class="full-width" />
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>