<script setup lang="ts">
import ConversationCount from './ConversationCount.vue';
import UserCount from './UserCount.vue';
import MessageCount from "./MessageCount.vue";
import PvCount from './PvCount.vue';
import { onMounted, ref, shallowRef } from 'vue';
import MachineStatus from './MachineStatus.vue';
import { HomepageSatisticsGroup } from '../../api-lib/admin-client';
import { getAdminClient } from '../../api-client/admin';

defineProps();

const charts = shallowRef([UserCount, ConversationCount, MessageCount, PvCount]);
const data = ref<HomepageSatisticsGroup>();

onMounted(async () => {
  const client = getAdminClient();
  const [err, res] = await client.GetHomepageSatistics();
  if (err) {
    console.error(err);
    return;
  }

  data.value = res;
});

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
      <component :is="chart" :group="data" />
    </el-col>
  </el-row>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
