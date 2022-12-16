import { Box, Stack } from "@mui/material";
import { FC, PropsWithChildren, useEffect, useMemo, useRef } from "react";

interface IChangeableBox {
  to: number;
  from: number;
  index: number;
  spacing: number;
  elList: Element[];
  dragWidth: number;
  dragHeight: number;
  activeIndex: number;
  previewEl: Element | null;

  handleSetDragTo: (to: number) => any;
  handleSetDragFrom: (from: number) => any;
  handleChangeIndex: (cb: () => any) => any;
  handleSetDragWidth: (width: number) => any;
  handleSetDragHeight: (height: number) => any;
  handleSetActiveIndex: (index: number) => any;
  handleUploadEl: (index: number, el: Element) => any;
}

const DRAG_TIMEOUT = 250;
const mouseData = (e: MouseEvent) => ({
  clientY: e.clientY,
  clientX: e.clientX,
});

// 魔法组件，理解起来可能有难度，但总体功能就是配合IndexChangeableStack实现拖拽功能
const ChangeableBox: FC<PropsWithChildren<IChangeableBox>> = ({
  to,
  from,
  index,
  elList,
  spacing,
  children,
  previewEl,
  dragWidth,
  dragHeight,
  activeIndex,
  handleUploadEl,
  handleSetDragTo,
  handleSetDragFrom,
  handleChangeIndex,
  handleSetDragWidth,
  handleSetDragHeight,
  handleSetActiveIndex,
}) => {
  // 可拖拽容器Ref
  const elRef = useRef<HTMLDivElement>(null);
  // 计算点击间隔的Ref
  const clickTimeStampRef = useRef(0);
  // 存储定时器Timer的Ref
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const listenerRef = useRef<(e: MouseEvent) => any>();

  const active = activeIndex !== -1;
  const currentActive = activeIndex === index;

  const handleClearListener = () => {
    if (listenerRef.current) {
      document.removeEventListener("mousemove", listenerRef.current);
    }
  };

  const filtedElList = useMemo(() => {
    return elList.filter((_, i) => i !== index);
  }, [elList, index]);

  const databox = useRef({
    from,
    to,
    dragHeight,
  });
  useEffect(() => {
    databox.current = { from, to, dragHeight };
  }, [from, to, dragHeight]);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    clickTimeStampRef.current = new Date().getTime();
    const width = e.currentTarget.offsetWidth;
    const height = e.currentTarget.offsetHeight;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    handleAddListener(width, height, offsetX, offsetY);
  };
  const handleAddListener = (
    width: number,
    height: number,
    offsetX: number,
    offsetY: number
  ) => {
    timerRef.current = setTimeout(() => {
      handleSetDragWidth(width);
      handleSetDragTo(index);
      handleSetDragFrom(index);
      handleSetDragHeight(height);
      handleSetActiveIndex(index);
      // 替换Listener
      handleClearListener();
      const midlines = filtedElList.map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });

      const listener = (e: MouseEvent) => {
        const el = elRef.current;
        if (!el) return;
        let clientY: number;
        let clientX: number;
        const data = mouseData(e);
        clientY = data.clientY;
        clientX = data.clientX;

        const { from, to, dragHeight } = databox.current;

        let i;
        for (i = 0; i < filtedElList.length; i++) {
          let offset = 0;
          if (from < to) {
            if (i >= from && i < to) {
              offset = -dragHeight - 8 * spacing;
            }
          } else {
            if (i < from && i >= to) {
              offset = dragHeight + 8 * spacing;
            }
          }

          if (clientY < midlines[i] + offset) {
            break;
          }
        }
        handleSetDragTo(i);

        el.style.top = clientY - offsetY + "px";
        el.style.left = clientX - offsetX + "px";
      };
      document.addEventListener("mousemove", listener);
      listenerRef.current = listener;
      timerRef.current = undefined;
    }, DRAG_TIMEOUT);
  };

  const handleExitDrag = () => {
    const el = elRef.current;
    if (!el) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    handleChangeIndex(() => {
      el.style.opacity = "";
      el.style.transition = "";
      el.style.top = "";
      el.style.left = "";
    });

    handleClearListener();

    if (!previewEl) return;
    const rect = previewEl.getBoundingClientRect();
    el.style.transition = "top 500ms, left 500ms";
    el.style.top = rect.top + "px";
    el.style.left = rect.left + "px";
    el.style.opacity = "1";
  };

  // 初始化拖拽功能
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    handleUploadEl(index, el);
  }, [index, children, active, elRef]);

  const transformSize = useMemo(() => {
    if (from < to) {
      if (index > from && index <= to) {
        return -dragHeight - 8 * spacing;
      }
    } else {
      if (index < from && index >= to) {
        return dragHeight + 8 * spacing;
      }
    }
    return 0;
  }, [dragHeight, spacing, from, to, index]);
  // 根据from、to和index的值设置Transform
  const transform = useMemo(() => {
    if (!active) return "";

    return `translateY(${transformSize}px)`;
  }, [from, to, index, dragHeight, active]);

  // MouseMove的时候要阻止点击事件
  const mouseMovePreventer = useRef(false);

  return (
    <Stack sx={{ height: currentActive ? dragHeight : "auto" }}>
      <Box
        ref={elRef}
        sx={{
          cursor: "pointer",
          userSelect: "none",
          transform: transform,
          position: currentActive ? "fixed" : "static",
          width: currentActive ? dragWidth : "auto",
          transition: active ? "200ms opacity, 400ms transform" : "",
          WebkitUserSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
          zIndex: 100,
          opacity: currentActive ? 0.75 : 1,
        }}
        onClickCapture={(e) => {
          
          if (currentActive) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleExitDrag}
        onMouseMove={() => {
          timerRef.current && clearTimeout(timerRef.current);
        }}
        onContextMenu={handleExitDrag}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default ChangeableBox;
