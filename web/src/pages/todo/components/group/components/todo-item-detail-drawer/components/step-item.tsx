import { FC, useEffect, useMemo, useState } from "react";
import { Stack, InputBase, Box, Skeleton } from "@mui/material";

import TodoItemCheckbox from "../../todo-item-checkbox";
import useTodoStore from "../../../../../hooks/use-todo-store";

interface IProps {
  todoId: number;
}

const StepItem: FC<IProps> = ({ todoId }) => {
  const { todoStore, fetchTodoItem, handleChangeTodoContent } = useTodoStore();

  const { store } = todoStore;

  const todoItem = store[todoId];

  const [input, setInput] = useState("");
  const resetInput = () => {
    setInput(todoItem?.Content ?? "");
  };

  const handleOnBlur = () => {
    const id = todoItem?.Id;
    if (!id) return;

    if (input !== todoItem?.Content) {
      handleChangeTodoContent(id, input);
    }
  };

  useEffect(() => {
    resetInput();
  }, [todoId, todoItem]);

  const contentRender = useMemo(() => {
    if (!todoItem) {
      fetchTodoItem(todoId);
      return <Skeleton variant="text" sx={{ fontSize: "1rem" }} />;
    }
    return (
      <InputBase
        sx={{ fontSize: "0.85rem" }}
        onBlur={handleOnBlur}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    );
  }, [todoItem, input]);

  return (
    <Stack direction="row">
      <TodoItemCheckbox size="small" todoItem={todoItem} />
      {contentRender}
    </Stack>
  );
};

export default StepItem;
