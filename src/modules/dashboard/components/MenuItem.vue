<template>
  <q-item clickable tag="a" :to="path">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label v-if="caption" caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface MenuItemsProps {
  title: string;
  caption?: string;
  path?: string;
  icon?: string;
}
withDefaults(defineProps<MenuItemsProps>(), {
  caption: '',
  path: '/',
  icon: '',
});
</script>
