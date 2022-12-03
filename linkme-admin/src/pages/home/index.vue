<script setup lang="ts">
import ConversationCount from './ConversationCount.vue';
import UserCount from './UserCount.vue';
import MessageCount from "./MessageCount.vue";
import PvCount from './PvCount.vue';
import { shallowRef } from 'vue';
import MachineStatus from './MachineStatus.vue';

const charts = shallowRef([UserCount, ConversationCount, MessageCount, PvCount])

defineProps()
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
  </el-breadcrumb>
  <h2>主机状态</h2>
  <MachineStatus />
  <h2>数据统计</h2>
  <el-row>
    <el-col :span="12" v-for="chart in charts">
      <component :is="chart" />
    </el-col>
  </el-row>
  <div>内存 磁盘 CPU</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
