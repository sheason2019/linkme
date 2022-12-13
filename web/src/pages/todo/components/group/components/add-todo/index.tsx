import { useState } from "react";
import { Card, IconButton, InputBase, Stack } from "@mui/material";

import PlusIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

import { getTodoClient } from "../../../../../../api-client";
import useGroup from "../../../../hooks/use-group";
import useErrorHandler from "../../../../../../common/hooks/use-error-handler";

const AddTodo = () => {
  const { groupid } = useGroup();
  const { handler } = useErrorHandler();
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (input.length === 0) return;

    const client = getTodoClient();

    const [err, res] = await client.PostTodo({
      Content: input,
      TodoId: 0,
      MountOn: "group",
      MountId: groupid,
    });

    if (err) {
      handler(err);
      return;
    }

    console.log(res);
  };

  return (
    <Card sx={{ p: 0.5 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton sx={{ color: "#1976d2", alignSelf: "start" }}>
          <PlusIcon />
        </IconButton>
        <InputBase
          sx={{ p: 0, flex: 1 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          multiline
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
        <IconButton
          sx={{ alignSelf: "end" }}
          color="primary"
          onClick={handleSubmit}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default AddTodo;
