import {
  Divider,
  Drawer,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import useTodoStore from "../../../../hooks/use-todo-store";
import AddTodo from "../add-todo";
import TodoItemCheckbox from "../todo-item-checkbox";
import StepItem from "./components/step-item";
import useTodoItemDetail from "./hooks";

const TodoItemDetailDrawer = () => {
  const { fetchTodoItem } = useTodoStore();
  const { todoItem, detailState, handleCloseDrawer } = useTodoItemDetail();

  const { open } = detailState;

  return (
    <Drawer open={open} anchor="right" onClose={handleCloseDrawer}>
      <Stack
        sx={{ width: 420, height: "100%", background: "whitesmoke", px: 2 }}
      >
        <Stack direction="row" sx={{ mt: 2 }} spacing={2} alignItems="end">
          <Typography variant="h5">任务事项详情</Typography>
          <Typography color="GrayText">TODO ID:{todoItem?.Id}</Typography>
        </Stack>
        <Paper sx={{ mt: 2, py: 0.5 }} elevation={0}>
          <Stack>
            <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
              <TodoItemCheckbox todoItem={todoItem} />
              <InputBase value={todoItem?.Content} />
            </Stack>
            <Divider sx={{ mx: 1, my: 0.25 }} />
            <Stack
              sx={{ px: 1 }}
              divider={<Divider sx={{ mx: 1, my: 0.25 }} />}
            >
              {todoItem?.ContainedList.map((id) => (
                <StepItem todoId={id} />
              ))}
              <AddTodo
                mountOn="todo"
                mountId={todoItem?.Id ?? 0}
                placeholder="添加步骤"
                afterSubmit={async () => fetchTodoItem(todoItem?.Id ?? 0)}
              />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Drawer>
  );
};

export default TodoItemDetailDrawer;
