import { Card, IconButton, InputBase, Stack } from "@mui/material";

import PlusIcon from "@mui/icons-material/Add";

const AddTodo = () => {
  return (
    <Card sx={{ p: 0.5 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <IconButton sx={{ color: "#1976d2" }}>
          <PlusIcon />
        </IconButton>
        <InputBase
          sx={{ p: 0, flex: 1 }}
          inputProps={{
            sx: {
              p: 0,
              "::placeholder": {
                color: "#1976d2",
                opacity: 1,
              },
            },
          }}
          placeholder="添加待办事项"
        />
      </Stack>
    </Card>
  );
};

export default AddTodo;
