import { FC, useMemo } from "react";
import { Checkbox } from "@mui/material";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { TodoItem, TodoStep } from "../../../../../../api-lib/todo-client";
import { TodoItemStatus } from "../../../../typings";
import useTodoStore from "../../../../hooks/use-todo-store";

interface ITodoItemCheckbox {
  itemType: "todo" | "step";
  item: TodoItem | TodoStep;
}

const TodoItemCheckbox: FC<ITodoItemCheckbox> = ({ item, itemType }) => {
  const { handleCompleteTodo, handleUncompleteTodo } = useTodoStore();

  const checkFill =
    item?.Status === TodoItemStatus.Commited ? "gray" : undefined;

  const value = useMemo(() => {
    if (!item) return false;

    return item.Status !== TodoItemStatus.Waiting;
  }, [item]);

  const handleOnChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const id = item.Id;

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
      icon={
        <RadioButtonUncheckedIcon
          fontSize={itemType === "step" ? "small" : "medium"}
        />
      }
      checkedIcon={
        <CheckCircleIcon
          fontSize={itemType === "step" ? "small" : "medium"}
          sx={{
            fill: checkFill,
          }}
        />
      }
    />
  );
};

export default TodoItemCheckbox;
