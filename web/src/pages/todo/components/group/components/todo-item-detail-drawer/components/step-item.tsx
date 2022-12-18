import { FC, useEffect, useState } from "react";
import { Stack, InputBase, Box } from "@mui/material";

import TodoItemCheckbox from "../../todo-item-checkbox";
import { TodoStep } from "../../../../../../../api-lib/todo-client";
import { getTodoClient } from "../../../../../../../api-client";
import useErrorHandler from "../../../../../../../common/hooks/use-error-handler";
import useTodoStore from "../../../../../hooks/use-todo-store";
import useTodoMenu from "../../todo-menu/hooks";

interface IProps {
  step: TodoStep;
  todoId: number;
}

const StepItem: FC<IProps> = ({ step, todoId }) => {
  const { handleOpenMenu } = useTodoMenu();
  const { fetchTodoItem } = useTodoStore();
  const { handler } = useErrorHandler();
  const [input, setInput] = useState("");
  const resetInput = () => {
    setInput(step.Content ?? "");
  };

  const handleOnBlur = async () => {
    const id = step.Id;
    if (!id) return;

    if (input !== step?.Content) {
      const client = getTodoClient();
      const postStep = { ...step };
      postStep.Content = input;
      const [err] = await client.PutTodoStep(postStep);
      fetchTodoItem(todoId);

      if (err) {
        handler(err);
        return;
      }
    }
  };

  const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const position = { top: e.clientY, left: e.clientX };
    handleOpenMenu(step.Id, position, "todo", todoId ?? 0);
  };

  useEffect(() => {
    resetInput();
  }, [step]);

  return (
    <Stack direction="row" component={Box} onContextMenu={handleContextMenu}>
      <TodoItemCheckbox item={step} itemType="step" />
      <InputBase
        sx={{ fontSize: "0.85rem", flex: 1 }}
        onBlur={handleOnBlur}
        multiline
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </Stack>
  );
};

export default StepItem;
