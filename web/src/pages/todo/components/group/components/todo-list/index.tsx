import { Stack } from "@mui/material";
import { useMemo } from "react";
import useGroup from "../../../../hooks/use-group";
import TodoItem from "../todo-item";

const TodoList = () => {
  const { groupState } = useGroup();

  const todoList = useMemo(() => {
    if (!groupState) return [];

    return groupState.TodoList;
  }, [groupState]);

  return (
    <Stack sx={{ mt: 2 }} spacing={1}>
      {todoList.map((item) => (
        <TodoItem key={item} todoId={item} />
      ))}
    </Stack>
  );
};

export default TodoList;
