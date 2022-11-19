import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import useCreateGroupConversation from "../../hooks/use-create-group-conversation";
import FormItem from "./components/form-item";

const CreateGroupDialog = () => {
  const { createGroupState, handleCloseDialog, resetForm } =
    useCreateGroupConversation();

  // 当Form的开闭状态发生变化时，重置表单
  useEffect(() => {
    resetForm();
  }, [createGroupState.dialog.open]);

  return (
    <Box component="form">
      <Dialog
        open={createGroupState.dialog.open}
        fullWidth
        onClose={handleCloseDialog}
      >
        <DialogTitle>创建群聊</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={1}>
            <FormItem
              label="群组名称"
              error=""
              element={<TextField fullWidth size="small" />}
            />
            <FormItem
              label="群组成员"
              error=""
              element={<TextField fullWidth size="small" />}
            />
            <FormItem
              label="成员列表"
              error=""
              element={
                <Box
                  sx={{
                    border: "1px solid lightgray",
                    minHeight: "6rem",
                    borderRadius: 1,
                  }}
                ></Box>
              }
            />
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button>重置</Button>
          <Button variant="contained">提交</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateGroupDialog;
