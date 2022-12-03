import { exec } from "child_process";
import os from "os";

export function getCPUInfo() {
  var cpus = os.cpus();

  var user = 0;
  var nice = 0;
  var sys = 0;
  var idle = 0;
  var irq = 0;
  var total = 0;

  for (var cpu in cpus) {
    if (!cpus.hasOwnProperty(cpu)) continue;
    user += cpus[cpu].times.user;
    nice += cpus[cpu].times.nice;
    sys += cpus[cpu].times.sys;
    irq += cpus[cpu].times.irq;
    idle += cpus[cpu].times.idle;
  }

  var total = user + nice + sys + idle + irq;

  return {
    idle: idle,
    total: total,
  };
}

export function getCPUUsage() {
  return new Promise<number>((resolver) => {
    var stats1 = getCPUInfo();
    var startIdle = stats1.idle;
    var startTotal = stats1.total;

    setTimeout(function () {
      var stats2 = getCPUInfo();
      var endIdle = stats2.idle;
      var endTotal = stats2.total;

      var idle = endIdle - startIdle;
      var total = endTotal - startTotal;
      var perc = idle / total;

      resolver(1 - perc);
    }, 1000);
  });
}

export function getMemInfo() {
  // 内存总量和空余内存
  return {
    totalMem: os.totalmem(),
    freeMem: os.totalmem(),
  };
}

interface IDiskInfo {
  // 可用空间
  blocks: number;
  // 已用空间
  used: number;
}

export function getDiskInfo() {
  return new Promise<IDiskInfo>((res, rej) => {
    exec("df -P | awk 'NR > 1'", (err, stdout, stderr) => {
      if (err) rej(err);
      var aLines = stdout.split("\n");

      var sLine = aLines[0];
      if (sLine != "") {
        sLine = sLine.replace(/ +(?= )/g, "");
        var aTokens = sLine.split(" ");
        res({
          blocks: Number(aTokens[1]),
          used: Number(aTokens[2]),
        });
      }
    });
  });
}
