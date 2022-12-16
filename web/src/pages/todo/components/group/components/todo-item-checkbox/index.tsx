import { FC, useMemo } from "react";
import { Checkbox } from "@mui/material";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { TodoItem } from "../../../../../../api-lib/todo-client";
import { TodoItemStatus } from "../../../../typings";
import useTodoStore from "../../../../hooks/use-todo-store";

interface ITodoItemCheckbox {
  todoItem: TodoItem | undefined;
  size?: "small" | "medium";
}

const TodoItemCheckbox: FC<ITodoItemCheckbox> = ({
  todoItem,
  size = "medium",
}) => {
  const { handleCompleteTodo, handleUncompleteTodo } = useTodoStore();

  const checkFill =
    todoItem?.Status === TodoItemStatus.Commited ? "gray" : undefined;

  const value = useMemo(() => {
    if (!todoItem) return false;

    return todoItem.Status !== TodoItemStatus.Waiting;
  }, [todoItem]);

  const handleOnChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const id = todoItem?.Id;
    if (!id) return;

    if (value) {
      handleUncompleteTodo(id);
    } else {
      handleCompleteTodo(id);
    }
  };

  return (
    <Checkbox
      onClick={handleOnChange}
      checked={value}
      icon={<RadioButtonUncheckedIcon fontSize={size} />}
      checkedIcon={
        <CheckCircleIcon
          fontSize={size}
          sx={{
            fill: checkFill,
          }}
        />
      }
    />
  );
};

export default TodoItemCheckbox;
