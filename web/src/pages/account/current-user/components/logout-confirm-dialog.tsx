import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { atom, useRecoilState } from "recoil";
import useUserInfo from "../../../../common/hooks/use-user-info";

interface IDialogState {
  open: boolean;
}

const dialogState = atom<IDialogState>({
  key: "account/current-user/logout-confirm-dialog",
  default: {
    open: false,
  },
});

export const useConfirmDialog = () => {
  const [dialog, setDialog] = useRecoilState(dialogState);

  const handleClose = () => {
    setDialog({ open: false });
  };
  const handleOpen = () => {
    setDialog({ open: true });
  };

  return {
    dialog,
    handleClose,
    handleOpen,
  };
};

const LogoutConfirmDialog = () => {
  const { dialog, handleClose } = useConfirmDialog();

  const { logout } = useUserInfo();
  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Dialog open={dialog.open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>注意</DialogTitle>
      <DialogContent>正在请求退出登录，是否确认？</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button variant="contained" color="error" onClick={handleLogout}>
          确定退出
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmDialog;
