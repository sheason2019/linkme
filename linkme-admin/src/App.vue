<script setup lang="ts">
import AppBar from './common/AppBar.vue';
import MenuRouter from './common/MenuRouter.vue';
</script>

<template>
  <AppBar />
  <div class="container">
    <MenuRouter />
    <div class="flex-grow">
      <el-main class="main">
        <router-view />
      </el-main>
    </div>
  </div>
</template>

<style scoped>
.container {
  flex: 1;
  display: flex;
  align-items: stretch;

  overflow: hidden;
}

.main {
  max-width: 1080px;
  margin: 0 auto;

  min-width: 960px;
}

.flex-grow {
  flex: 1;
  overflow: auto;
}
</style>

