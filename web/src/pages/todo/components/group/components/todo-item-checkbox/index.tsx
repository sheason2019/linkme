import { FC, useMemo } from "react";
import { Checkbox } from "@mui/material";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { TodoItem } from "../../../../../../api-lib/todo-client";
import { TodoItemStatus } from "../../../../typings";

interface ITodoItemCheckbox {
  todoItem: TodoItem | undefined;
  size?: "small" | "medium";
}

const TodoItemCheckbox: FC<ITodoItemCheckbox> = ({
  todoItem,
  size = "medium",
}) => {
  const checkFill =
    todoItem?.Status === TodoItemStatus.Commited ? "gray" : undefined;

  return (
    <Checkbox
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
