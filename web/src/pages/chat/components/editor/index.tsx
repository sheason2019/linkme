import { InputBase, Stack } from "@mui/material";
import { useCheckMobile } from "../../../../common/hooks/use-check-mobile";
import useEditor from "../../hooks/use-editor";

const Editor = () => {
  const { isMobile } = useCheckMobile();
  const { editor, handleSetContent } = useEditor();

  if (!isMobile) {
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
  }
  return (
    <InputBase
      multiline
      maxRows={4}
      value={editor.content}
      onChange={(e) => handleSetContent(e.target.value)}
      sx={{
        paddingX: "0.5rem",
        height: "100%",
        width: "100%",
        background: "#ECECEC",
        borderRadius: 2,
      }}
    />
  );
};

export default Editor;
