<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, watch } from 'vue';

import SharedWorker from "../../worker/shared-worker?sharedworker"
import { MachineStatusMessage } from '../../worker/typings';

const worker = new SharedWorker();
worker.port.addEventListener("message", (e) => {
  const msm: MachineStatusMessage = e.data;
  const gaugeData = createData(msm);

  const chart = chartRef.value;
  chart && chart.setOption({
    series: [
      {
        data: gaugeData,
        pointer: {
          show: false
        }
      }
    ]
  });
})

worker.port.start();

const DEFAULT_MSM: MachineStatusMessage = {
  type: 'machineStatus',
  data: {
    cpuPercent: 0,
    memSize: 0,
    memUsed: 0,
    diskSize: 0,
    diskUsed: 0,
  }
}

const container = ref<HTMLDivElement>();
const chartRef = ref<echarts.ECharts>();

type EChartsOption = echarts.EChartsOption;

const createData = (msm: MachineStatusMessage): echarts.GaugeSeriesOption['data'] => {
  const data = msm.data;
  return [
    {
      value: (data.memUsed / data.memSize) * 100,
      name: '内存占用（MB）',
      title: {
        offsetCenter: ['0%', '-36%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-24%'],
        formatter: `${Math.floor(data.memUsed / 1000000)}/${Math.floor(data.memSize / 1000000)}`,
      }
    },
    {
      value: (data.diskUsed / data.diskSize) * 100,
      name: '磁盘占用（GB）',
      title: {
        offsetCenter: ['0%', '-6%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '6%'],
        formatter: `${Math.floor(data.diskUsed / 1000000)}/${Math.floor(data.diskSize / 1000000)}`,
      }
    },
    {
      value: Number((data.cpuPercent * 100).toFixed(2)),
      name: 'CPU占用',
      title: {
        offsetCenter: ['0%', '24%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '36%']
      }
    }
  ]
};

watch(container, () => {
  const el = container.value;
  if (!el) return;

  var myChart = echarts.init(el);
  var option: EChartsOption;

  const gaugeData = createData(DEFAULT_MSM);

  option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646'
          }
        },
        axisLine: {
          lineStyle: {
            width: 40
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: gaugeData,
        title: {
          fontSize: 14
        },
        detail: {
          height: 18,
          fontSize: 14,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%'
        }
      }
    ]
  };

  option && myChart.setOption(option);

  chartRef.value = myChart;
})
</script>

<template>
  <div class="container" ref="container"></div>
</template>

<style scoped>
.container {
  height: 620px;
}
</style>