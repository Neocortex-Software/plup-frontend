<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Plup
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-primary text-white">
      <q-tabs no-caps>
        <q-route-tab v-for="tab in tabs" v-bind:key="tab.name" :to="{ name: tab.pathName }" :name="tab.name"
          :icon="tab.icon" :label="tab.label" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const tabs = [
  {
    icon: 'home',
    name: 'home',
    label: t('home'),
    pathName: 'main',
    exact: true,
  },
  {
    icon: 'redeem',
    name: 'giftcards',
    label: t('giftcards'),
    pathName: 'giftcards',
    exact: true,
  },
  {
    icon: 'local_activity',
    name: 'vouchers',
    label: t('vouchers'),
    pathName: 'vouchers',
    exact: true,
  },
  {
    icon: 'stars',
    name: 'points',
    label: t('points'),
    pathName: 'points',
    exact: true,
  },
];
</script>