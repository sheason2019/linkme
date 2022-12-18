import { FC, useState } from "react";
import { IconButton, InputBase, Stack } from "@mui/material";

import PlusIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

import { getTodoClient } from "../../../../../../api-client";
import useErrorHandler from "../../../../../../common/hooks/use-error-handler";
import { OmiError } from "@omi-stack/omi-client/dist/typings";

interface IProps {
  placeholder?: string;
  mountOn: "group" | "todo";
  mountId: number;
  afterSubmit?: () => any;
}

const AddTodo: FC<IProps> = ({
  placeholder,
  mountId,
  mountOn,
  afterSubmit,
}) => {
  const { handler } = useErrorHandler();
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (input.length === 0 || mountId === 0) return;

    const client = getTodoClient();

    let err: OmiError | null = null;
    if (mountOn === "group") {
      const [error] = await client.PostTodo({
        Content: input,
        TodoId: 0,
        GroupId: mountId,
      });
      err = error;
    } else {
      // 这里创建Step
      const [error] = await client.PostTodoStep(input, mountId);
      err = error;
    }

    if (err) {
      handler(err);
      return;
    }

    // 清空输入框
    setInput("");
    afterSubmit && (await afterSubmit());
  };

  return (
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
        placeholder={placeholder ?? "添加待办事项"}
      />
      <IconButton
        sx={{ alignSelf: "end" }}
        color="primary"
        onClick={handleSubmit}
      >
        <SendIcon />
      </IconButton>
    </Stack>
  );
};

export default AddTodo;
