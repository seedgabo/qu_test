<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-title>
      <v-icon icon="mdi-arrow-left" v-if="id" @click="goBack()" />
      <v-icon icon="mdi-circle-slice-6" v-else />
      <span v-if="pageTitle">
        {{ pageTitle }}
      </span>
      <template v-else>
        Planet Tourist Guide - Star Wars <span class="hidden-md-and-down">Edition</span>
      </template>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAppStore } from '../../store/app';
const appStore = useAppStore();
const pageTitle = computed(() => appStore.pageTitle);
const $route = useRoute();
const id = computed(() => ($route.params as { id: string}).id);
const router = useRouter();
const goBack = () => {
  router.go(-1);
}
</script>
