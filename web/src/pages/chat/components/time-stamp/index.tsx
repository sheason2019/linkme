import { FC, useMemo } from "react";

interface Props {
  timeStamp?: number;
}

const HOUR = 60 * 60;

// 将整型时间戳转换为时间展示的组件
const TimeStamp: FC<Props> = ({ timeStamp }) => {
  if (!timeStamp) return null;

  const timeStr = useMemo(() => {
    const todayStamp = Math.floor(
      new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000
    );
    const yesterdayStamp = todayStamp - 24 * HOUR;

    const thisTimeStamp = timeStamp;

    const time = new Date(thisTimeStamp * 1000);

    let timeStr: string;

    if (thisTimeStamp > todayStamp) {
      // 今天接收的信息展示 hh:mm
      const hour = time.getHours().toString().padStart(2, "0");
      const minute = time.getMinutes().toString().padStart(2, "0");

      timeStr = `${hour}:${minute}`;
    } else if (thisTimeStamp > yesterdayStamp) {
      // 昨天接收的信息展示 昨天 hh:mm
      const hour = time.getHours().toString().padStart(2, "0");
      const minute = time.getMinutes().toString().padStart(2, "0");

      timeStr = `昨天 ${hour}:${minute}`;
    } else {
      // 更早的信息展示yyyy-MM-dd
      const year = time.getFullYear();
      const month = (time.getMonth() + 1).toString().padStart(2, "0");
      const date = time.getDate().toString().padStart(2, "0");

      timeStr = `${year}-${month}-${date}`;
    }

    return timeStr;
  }, [timeStamp]);

  return <div>{timeStr}</div>;
};

export default TimeStamp;
