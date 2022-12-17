import {
  Divider,
  Drawer,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getTodoClient } from "../../../../../../api-client";
import { TodoItem } from "../../../../../../api-lib/todo-client";
import IndexChangeableStack from "../../../../../../common/components/index-changeable-stack";
import useErrorHandler from "../../../../../../common/hooks/use-error-handler";
import useTodoStore from "../../../../hooks/use-todo-store";
import AddTodo from "../add-todo";
import TodoItemCheckbox from "../todo-item-checkbox";
import StepItem from "./components/step-item";
import useTodoItemDetail from "./hooks";

const TodoItemDetailDrawer = () => {
  const { handler } = useErrorHandler();
  const { fetchTodoItem, handleChangeTodoContent, handleSetTodoItems } =
    useTodoStore();
  const { todoItem, detailState, handleCloseDrawer } = useTodoItemDetail();

  const { open } = detailState;

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

  const handleIndexChange = async (from: number, to: number) => {
    const list = [...todoItem!.ContainedList];
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);

    const todo: TodoItem = { ...todoItem!, ContainedList: list };
    handleSetTodoItems([todo]);

    const client = getTodoClient();
    const [err] = await client.PutTodo(todo);
    if (err) {
      handler(err);
      return;
    }

    fetchTodoItem(todoItem!.Id);
  };

  useEffect(() => {
    resetInput();
  }, [open]);

  return (
    <Drawer open={open} anchor="right" onClose={handleCloseDrawer}>
      <Stack
        sx={{ width: 420, height: "100%", background: "whitesmoke", px: 2 }}
      >
        <Stack direction="row" sx={{ mt: 2 }} spacing={2} alignItems="end">
          <Typography variant="h5">任务事项详情</Typography>
          <Typography color="GrayText">TODO ID:{todoItem?.Id}</Typography>
        </Stack>
        <Paper sx={{ mt: 2, py: 0.5, px: 1 }} elevation={0}>
          <Stack>
            <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
              <TodoItemCheckbox todoItem={todoItem} />
              <InputBase
                multiline
                onBlur={handleOnBlur}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Stack>
            <Divider sx={{ mx: 1, my: 0.25 }} />
            {todoItem?.ContainedList && (
              <IndexChangeableStack
                sx={{ px: 1 }}
                divider={<Divider sx={{ mx: 1 }} />}
                onIndexChange={handleIndexChange}
              >
                {todoItem?.ContainedList.map((id) => (
                  <StepItem key={id} todoId={id} />
                ))}
              </IndexChangeableStack>
            )}
            <AddTodo
              mountOn="todo"
              mountId={todoItem?.Id ?? 0}
              placeholder="添加步骤"
              afterSubmit={async () => fetchTodoItem(todoItem?.Id ?? 0)}
            />
          </Stack>
        </Paper>
      </Stack>
    </Drawer>
  );
};

export default TodoItemDetailDrawer;
