<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, watch } from 'vue';

const container = ref<HTMLDivElement>();

watch(container, () => {
  const option: echarts.EChartsOption = {
    xAxis: {
      type: "category",
      data: ["a", "b", "c"]
    },
    yAxis: {
      type: "value",
    },
    series: [
      { data: [1, 2, 3], type: 'line' }
    ],
    title: {
      text: "会话数量"
    },
  };

  const el = container.value;
  if (!el) return;

  const charts = echarts.init(el);
  charts.setOption(option);
});
</script>

<template>
  <div ref="container"></div>
</template>

<style scoped>
div {
  height: 275px;
}
</style>