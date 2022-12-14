import { Box, Card, Checkbox, Skeleton, Stack } from "@mui/material";
import { FC, useMemo } from "react";
import useTodoStore from "../../../../hooks/use-todo-store";
import TodoItemCheckbox from "../todo-item-checkbox";
import useTodoItemDetail from "../todo-item-detail-drawer/hooks";

interface ITodoItem {
  todoId: number;
}

const TodoItem: FC<ITodoItem> = ({ todoId }) => {
  const { handleOpenDrawer } = useTodoItemDetail();
  const { todoStore, fetchTodoItem } = useTodoStore();
  const { store } = todoStore;

  const todoItem = store[todoId];

  const contentRender = useMemo(() => {
    if (!todoItem) {
      fetchTodoItem(todoId);
      return <Skeleton variant="text" sx={{ fontSize: "1rem" }} />;
    }
    return <Box>{todoItem.Content}</Box>;
  }, [todoItem]);

  return (
    <Card onClick={() => handleOpenDrawer(todoId)} sx={{ cursor: "pointer" }}>
      <Stack direction="row" alignItems="center">
        <TodoItemCheckbox todoItem={todoItem} />
        <Box sx={{ flex: 1, pr: 2, pl: 1 }}>{contentRender}</Box>
      </Stack>
    </Card>
  );
};

export default TodoItem;
