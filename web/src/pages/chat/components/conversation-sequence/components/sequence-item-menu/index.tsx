import { Menu, MenuItem } from "@mui/material";
import { FC } from "react";
import useSocket from "../../../../hooks/use-socket";

interface IProps {
  open: boolean;
  position: {
    x: number;
    y: number;
  };
  convId: number;
  onClose: () => any;
}

const SequenceItemMenu: FC<IProps> = ({ open, position, convId, onClose }) => {
  const { handleDeleteSequence } = useSocket();
  const handleDelete = async () => {
    await handleDeleteSequence(convId);
    onClose();
  };

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: position.y, left: position.x }}
    >
      <MenuItem sx={{ color: "red" }} onClick={handleDelete}>
        删除会话
      </MenuItem>
    </Menu>
  );
};

export default SequenceItemMenu;
