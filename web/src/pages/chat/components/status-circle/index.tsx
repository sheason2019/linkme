import { FC, useEffect, useMemo, useRef } from "react";

interface Props {
  loading: boolean;
  /** 应该收到该讯息的人数 */
  target: number;
  /** 当前收到该信息的人数 */
  current: number;
}

const StatusCircle: FC<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) throw "无法获取Canvas Context";
    ctx.clearRect(0, 0, 18, 18);

    ctx.lineWidth = 1.75;
    if (props.loading) {
      loadingCircle(ctx);
    } else {
      postedCircle(ctx, props.target, props.current);
    }
  }, [props.current, props.target, props.loading]);

  const styles = useMemo(() => {
    return props.loading ? "animate-pulse" : "";
  }, [props.loading]);

  return (
    <div className={styles}>
      <canvas width={18} height={18} ref={canvasRef} />
    </div>
  );
};

const loadingCircle = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(9, 9, 6, 0, 2 * Math.PI);
  ctx.stroke();
};
const postedCircle = (
  ctx: CanvasRenderingContext2D,
  target: number,
  current: number
) => {
  // 偏移量，让阅读数从12点钟方向开始填充
  const offset = -Math.PI / 2;
  ctx.strokeStyle = "rgb(46,125,50)";
  ctx.beginPath();
  ctx.arc(9, 9, 6, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "rgb(46,125,50)";
  ctx.beginPath();
  if (current < target) {
    // 接收消息数未满的时候绘制扇形
    ctx.moveTo(9, 9);
    ctx.arc(9, 9, 6, offset, offset + (2 * Math.PI * current) / target);
    ctx.fill();
  } else {
    // 所有目标都接收消息以后绘制完成标志
    ctx.moveTo(6, 8.5);
    ctx.lineTo(8.5, 11);
    ctx.lineTo(12, 7);
    ctx.stroke();
  }
};

export default StatusCircle;
