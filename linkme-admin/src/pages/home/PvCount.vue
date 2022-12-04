<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';
import { HomepageSatisticsGroup } from '../../api-lib/admin-client';

const props = defineProps<{ group: HomepageSatisticsGroup }>()

const container = ref<HTMLDivElement>();
const chartRef = ref<echarts.ECharts>();

// 组件挂载时初始化Echarts
onMounted(() => {
  const el = container.value;
  if (!el) return;

  chartRef.value = echarts.init(el);
});

// 当传入的数据发生变化时，更新图标的内容
watch([container, props], () => {
  const data = props.group?.UVCounts ?? [];

  const option: echarts.EChartsOption = {
    xAxis: {
      type: "category",
      data: data.map(item => item.Label),
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
    },
    series: [
      { data: data.map(item => item.Count), type: 'line' }
    ],
    title: {
      text: "UV趋势"
    },
  };

  const chart = chartRef.value;

  chart && chart.setOption(option);
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