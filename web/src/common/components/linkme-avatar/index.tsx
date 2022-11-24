import { Avatar } from "@mui/material";
import { FC } from "react";

interface ILinkmeAvatar {
  sourceHash?: string;
  size?: number;
  onClick?: () => any;
}

const LinkmeAvatar: FC<ILinkmeAvatar> = ({ sourceHash, size, onClick }) => {
  return (
    <Avatar
      src={!!sourceHash ? `/api/image/${sourceHash}` : undefined}
      sx={{ width: size, height: size, cursor: "pointer" }}
      onClick={onClick}
    />
  );
};

export default LinkmeAvatar;
