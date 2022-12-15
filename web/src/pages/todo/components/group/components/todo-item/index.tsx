import { Box, Card, InputBase, Skeleton, Stack } from "@mui/material";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import useGroup from "../../../../hooks/use-group";
import useTodoStore from "../../../../hooks/use-todo-store";
import TodoItemCheckbox from "../todo-item-checkbox";
import useTodoItemDetail from "../todo-item-detail-drawer/hooks";
import useTodoMenu from "../todo-menu/hooks";

interface ITodoItem {
  to: number;
  from: number;
  index: number;
  todoId: number;
  midlines: number[];
  dragHeight: number;
  activeIndex: number;

  handleSetDragTo: (to: number) => any;
  handleSetDragFrom: (from: number) => any;
  handleSetDragHeight: (height: number) => any;
  handleUploadMidline: (index: number, midline: number) => any;
  handleSetActiveIndex: (index: number) => any;
}

// 在400ms后进入drag状态
const DRAG_TIMEOUT = 400;

const TodoItem: FC<ITodoItem> = ({
  to,
  from,
  index,
  todoId,
  midlines,
  dragHeight,
  activeIndex,
  handleSetDragTo,
  handleSetDragFrom,
  handleSetDragHeight,
  handleUploadMidline,
  handleSetActiveIndex,
}) => {
  const { groupid } = useGroup();
  const { handleOpenMenu } = useTodoMenu();
  const { handleOpenDrawer } = useTodoItemDetail();
  const { todoStore, fetchTodoItem } = useTodoStore();
  const { store } = todoStore;

  const todoItem = store[todoId];

  const contentRender = useMemo(() => {
    if (!todoItem) {
      fetchTodoItem(todoId);
      return (
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      );
    }
    return (
      <InputBase
        readOnly
        multiline
        inputProps={{ sx: { cursor: "pointer" } }}
        sx={{ flex: 1, pr: 2, pl: 1 }}
        value={todoItem?.Content ?? ""}
      />
    );
  }, [todoItem]);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    const position = { top: e.clientY, left: e.clientX };
    handleOpenMenu(todoId, position, "group", groupid);
  };

  // 可拖拽容器Ref
  const elRef = useRef<HTMLDivElement>(null);
  // 计算点击间隔的Ref
  const clickTimeStampRef = useRef(0);
  // 存储定时器Timer的Ref
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const listenerRef = useRef<(e: MouseEvent) => any>();

  const active = activeIndex !== -1;
  const currentActive = activeIndex === index;

  const [width, setWidth] = useState(0);

  const handleClearListener = () => {
    if (listenerRef.current) {
      document.removeEventListener("mousemove", listenerRef.current);
    }
  };

  const filtedMidlines = useMemo(() => {
    return midlines.filter((_, i) => i !== index);
  }, [midlines, index]);

  const databox = useRef({
    from,
    to,
    dragHeight,
  });
  useEffect(() => {
    databox.current = { from, to, dragHeight };
  }, [from, to, dragHeight]);
  const handleMouseDown = (e: React.DragEvent<HTMLDivElement>) => {
    clickTimeStampRef.current = new Date().getTime();
    const width = e.currentTarget.offsetWidth;
    const height = e.currentTarget.offsetHeight;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    timerRef.current = setTimeout(() => {
      setWidth(width);
      handleSetDragTo(index);
      handleSetDragFrom(index);
      handleSetDragHeight(height);
      handleSetActiveIndex(index);
      // 替换Listener
      handleClearListener();
      const listener = (e: MouseEvent) => {
        const el = elRef.current;
        if (!el) return;

        const clientY = e.clientY;
        const { from, to, dragHeight } = databox.current;

        let i;
        for (i = 0; i < filtedMidlines.length; i++) {
          let offset = 0;
          if (from < to) {
            if (i >= from && i < to) {
              offset = -dragHeight;
            }
          } else {
            if (i < from && i >= to) {
              offset = dragHeight;
            }
          }
          if (clientY < filtedMidlines[i] + offset) {
            break;
          }
        }
        handleSetDragTo(i);

        el.style.top = e.clientY - offsetY + "px";
        el.style.left = e.clientX - offsetX + "px";
      };
      document.addEventListener("mousemove", listener);
      listenerRef.current = listener;
      timerRef.current = undefined;
    }, DRAG_TIMEOUT);
  };

  const handleMouseUp = (e: React.DragEvent<HTMLDivElement>) => {
    const time = new Date().getTime();
    handleExitDrag();

    if (time - clickTimeStampRef.current < DRAG_TIMEOUT) {
      handleOpenDrawer(todoId);
    }
  };

  const handleExitDrag = () => {
    const el = elRef.current;
    if (!el) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    handleSetActiveIndex(-1);

    handleClearListener();

    el.style.top = "";
    el.style.left = "";
  };

  // 初始化拖拽功能
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const midline = rect.top + el.offsetHeight / 2;
      handleUploadMidline(index, midline);
      console.log(index, midline, rect);
    }, 100);
  }, [index, todoItem]);

  // 根据from、to和index的值设置Transform
  const transform = useMemo(() => {
    if (!active) return "";

    // Item向下移动
    if (from < to) {
      if (index > from && index <= to) {
        return `translateY(${-dragHeight}px)`;
      }
    } else {
      if (index < from && index >= to) {
        return `translateY(${dragHeight}px)`;
      }
    }
    return "";
  }, [from, to, index, dragHeight, active]);

  return (
    <Box sx={{ height: currentActive ? dragHeight : "auto" }}>
      <Card
        ref={elRef}
        sx={{
          cursor: "pointer",
          userSelect: "none",
          transform: transform,
          position: currentActive ? "fixed" : "static",
          width: currentActive ? width : "auto",
          transition: "200ms opacity, 400ms transform",
          zIndex: 100,
          opacity: currentActive ? 0.75 : 1,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={() => timerRef.current && clearTimeout(timerRef.current)}
        onContextMenu={handleContextMenu}
      >
        <Stack direction="row" alignItems="center">
          <TodoItemCheckbox todoItem={todoItem} />
          {contentRender}
        </Stack>
      </Card>
    </Box>
  );
};

export default TodoItem;
