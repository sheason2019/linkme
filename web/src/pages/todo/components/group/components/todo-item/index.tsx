import { Box, Card, Skeleton, Stack } from "@mui/material";
import { FC, useMemo } from "react";
import useGroup from "../../../../hooks/use-group";
import useTodoStore from "../../../../hooks/use-todo-store";
import TodoItemCheckbox from "../todo-item-checkbox";
import useTodoItemDetail from "../todo-item-detail-drawer/hooks";
import useTodoMenu from "../todo-menu/hooks";

interface ITodoItem {
  todoId: number;
}

const TodoItem: FC<ITodoItem> = ({ todoId }) => {
  const { groupid } = useGroup();
  const { handleOpenMenu } = useTodoMenu();
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

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    const position = { top: e.clientY, left: e.clientX };
    handleOpenMenu(todoId, position, "group", groupid);
  };

  return (
    <Card
      onClick={() => handleOpenDrawer(todoId)}
      sx={{ cursor: "pointer" }}
      onContextMenu={handleContextMenu}
    >
      <Stack direction="row" alignItems="center">
        <TodoItemCheckbox todoItem={todoItem} />
        <Box sx={{ flex: 1, pr: 2, pl: 1 }}>{contentRender}</Box>
      </Stack>
    </Card>
  );
};

export default TodoItem;
