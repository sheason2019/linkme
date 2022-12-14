import ListIcon from "@mui/icons-material/List";
import { Box, Card, Container, Stack } from "@mui/material";
import { useEffect, useMemo } from "react";
import useGroup from "../../hooks/use-group";
import AddTodo from "./components/add-todo";
import TodoItemDetailDrawer from "./components/todo-item-detail-drawer";
import TodoList from "./components/todo-list";

const Group = () => {
  const { groupState, fetchGroup } = useGroup();

  useEffect(() => {
    fetchGroup();
  }, []);

  const groupName = useMemo(
    () => (groupState?.Type === "default" ? "任务" : groupState?.Name),
    [groupState]
  );

  if (!groupState) return null;

  return (
    <>
      <Container>
        <Stack direction="row" sx={{ mt: 2, alignItems: "center" }} spacing={2}>
          <ListIcon fontSize="large" />
          <Box sx={{ fontSize: "1.55rem" }}>{groupName}</Box>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Card sx={{ p: 0.5 }}>
            <AddTodo
              mountOn="group"
              mountId={groupState.GroupId}
              afterSubmit={fetchGroup}
            />
          </Card>
        </Box>
        <TodoList />
      </Container>
      <TodoItemDetailDrawer />
    </>
  );
};

export default Group;
