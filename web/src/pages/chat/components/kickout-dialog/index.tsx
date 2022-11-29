import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { atom, useRecoilState } from "recoil";
import useSocket from "../../hooks/use-socket";

interface IKickoutState {
  open: boolean;
  convId: number;
}

const kickoutState = atom<IKickoutState>({
  key: "chat/chat-box/kickout",
  default: {
    open: false,
    convId: 0,
  },
});

export const useKickoutDialog = () => {
  const [kickout, setKickout] = useRecoilState(kickoutState);

  const handleOpen = (convId: number) =>
    setKickout((prev) => ({ convId, open: true }));
  const handleClose = () => setKickout((prev) => ({ ...prev, open: false }));

  return {
    kickout,
    setKickout,
    handleOpen,
    handleClose,
  };
};

const KickoutDialog = () => {
  const { handleLeaveConversation, handleDeleteSequence } = useSocket();
  const { kickout, handleClose } = useKickoutDialog();

  const handleOnClick = async () => {
    handleLeaveConversation();
    await handleDeleteSequence(kickout.convId);
    handleClose();
  };

  return (
    <Dialog open={kickout.open} maxWidth="xs" fullWidth sx={{ zIndex: 10030 }}>
      <DialogTitle>通知</DialogTitle>
      <DialogContent>您已被移出群聊</DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleOnClick}>
          我知道了
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KickoutDialog;
