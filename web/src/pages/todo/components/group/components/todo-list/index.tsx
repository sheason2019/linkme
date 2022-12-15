import { Stack } from "@mui/material";
import { useMemo, useState } from "react";
import useGroup from "../../../../hooks/use-group";
import TodoItem from "../todo-item";
import TodoMenu from "../todo-menu";

interface IDragState {
  to: number;
  from: number;
  height: number;
  activeIndex: number;
  midLineList: number[];
}

const TodoList = () => {
  const { groupState } = useGroup();

  const todoList = useMemo(() => {
    if (!groupState) return [];

    return groupState.TodoList;
  }, [groupState]);

  const [dragState, setDragState] = useState<IDragState>({
    to: 0,
    from: 0,
    height: 0,
    activeIndex: -1,
    midLineList: [],
  });

  const handleUploadMidline = (index: number, midLine: number) => {
    setDragState((prev) => {
      const list = [...prev.midLineList];
      list[index] = midLine;
      return { ...prev, midLineList: list };
    });
  };
  const handleSetDragFrom = (from: number) => {
    setDragState((prev) => ({ ...prev, from }));
  };
  const handleSetDragTo = (to: number) => {
    setDragState((prev) => ({ ...prev, to }));
  };
  const handleSetDragHeight = (height: number) => {
    setDragState((prev) => ({ ...prev, height }));
  };
  const handleSetActiveIndex = (index: number) => {
    setDragState((prev) => ({ ...prev, activeIndex: index }));
  };

  return (
    <>
      <Stack sx={{ mt: 2 }} spacing={1}>
        {todoList.map((item, index) => (
          <TodoItem
            key={item}
            todoId={item}
            index={index}
            to={dragState.to}
            from={dragState.from}
            dragHeight={dragState.height}
            midlines={dragState.midLineList}
            activeIndex={dragState.activeIndex}
            handleSetDragTo={handleSetDragTo}
            handleSetDragFrom={handleSetDragFrom}
            handleSetDragHeight={handleSetDragHeight}
            handleUploadMidline={handleUploadMidline}
            handleSetActiveIndex={handleSetActiveIndex}
          />
        ))}
      </Stack>
      <TodoMenu />
    </>
  );
};

export default TodoList;
