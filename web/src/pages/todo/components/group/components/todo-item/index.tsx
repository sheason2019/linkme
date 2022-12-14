import { Box, Card, Checkbox, Skeleton, Stack } from "@mui/material";
import { FC, useMemo } from "react";
import useTodoStore from "../../../../hooks/use-todo-store";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/Circle";

interface ITodoItem {
  todoId: number;
}

const TodoItem: FC<ITodoItem> = ({ todoId }) => {
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
    <Card>
      <Stack direction="row" alignItems="center">
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CircleIcon />}
        />
        <Box sx={{ flex: 1, pr: 2, pl: 1 }}>{contentRender}</Box>
      </Stack>
    </Card>
  );
};

export default TodoItem;
