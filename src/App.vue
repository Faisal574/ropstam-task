<script setup>
import Settings from "./components/Settings.vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
</script>
<template>
  <template v-if="$route.path != '/' && $route.path != '/login'">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <Settings />
        <Sidebar />
        <router-view></router-view>
      </div>
    </div>
  </template>
  <template v-else>
    <router-view></router-view>
  </template>
</template>

<style scoped></style>
