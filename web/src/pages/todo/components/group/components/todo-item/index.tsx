import { Box, Card, InputBase, Skeleton, Stack } from "@mui/material";
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
    return (
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: 10 }}
        />
        <InputBase
          readOnly
          multiline
          inputProps={{
            sx: { cursor: "pointer" },
          }}
          sx={{ flex: 1, pr: 2, pl: 1, cursor: "pointer" }}
          value={todoItem?.Content ?? ""}
        />
      </Box>
    );
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
      onContextMenu={handleContextMenu}
      onClick={() => handleOpenDrawer(todoId)}
    >
      <Stack direction="row" alignItems="center">
        <TodoItemCheckbox todoItem={todoItem} />
        {contentRender}
      </Stack>
    </Card>
  );
};

export default TodoItem;
