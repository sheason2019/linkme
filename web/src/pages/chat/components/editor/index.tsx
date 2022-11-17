import { InputBase, Stack } from "@mui/material";
import useEditor from "../../hooks/use-editor";

const Editor = () => {
  const { editor, handleSetContent } = useEditor();

  return (
    <Stack
      sx={{
        position: "relative",
        py: "15px",
        px: "10px",
        flex: 1,
        overflowY: "auto",
      }}
    >
      <InputBase
        multiline
        value={editor.content}
        onChange={(e) => handleSetContent(e.target.value)}
        sx={{ height: "100%" }}
        inputProps={{ style: { height: "100%" } }}
      />
    </Stack>
  );
};

export default Editor;
