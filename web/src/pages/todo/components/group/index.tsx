import ListIcon from "@mui/icons-material/List";
import { Box, Container, Stack } from "@mui/material";
import AddTodo from "./components/add-todo";

const Group = () => {
  return (
    <Container>
      <Stack direction="row" sx={{ mt: 2, alignItems: "center" }} spacing={2}>
        <ListIcon fontSize="large" />
        <Box sx={{ fontSize: "1.55rem" }}>GROUP NAME</Box>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <AddTodo />
      </Box>
    </Container>
  );
};

export default Group;
