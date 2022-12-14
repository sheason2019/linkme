import { Box } from "@mui/material";
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
    <Box sx={{ mt: 2 }}>
      {todoList.map((item) => (
        <TodoItem key={item} todoId={item} />
      ))}
    </Box>
  );
};

export default TodoList;
