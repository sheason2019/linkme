import { FC, useMemo } from "react";
import { Stack, InputBase, Box, Skeleton } from "@mui/material";

import TodoItemCheckbox from "../../todo-item-checkbox";
import useTodoStore from "../../../../../hooks/use-todo-store";

interface IProps {
  todoId: number;
}

const StepItem: FC<IProps> = ({ todoId }) => {
  const { todoStore, fetchTodoItem } = useTodoStore();

  const { store } = todoStore;

  const todoItem = store[todoId];

  const contentRender = useMemo(() => {
    if (!todoItem) {
      fetchTodoItem(todoId);
      return <Skeleton variant="text" sx={{ fontSize: "1rem" }} />;
    }
    return <InputBase sx={{ fontSize: "0.85rem" }} value={todoItem?.Content} />;
  }, [todoItem]);

  return (
    <Stack direction="row">
      <TodoItemCheckbox size="small" todoItem={todoItem} />
      {contentRender}
    </Stack>
  );
};

export default StepItem;
