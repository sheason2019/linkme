import { Avatar } from "@mui/material";
import { forwardRef } from "react";

interface ILinkmeAvatar {
  sourceHash?: string;
  size?: number;
  onClick?: () => any;
}

const LinkmeAvatar = forwardRef<HTMLDivElement | null, ILinkmeAvatar>(
  (props, ref) => {
    const { sourceHash, size, ...extra } = props;
    return (
      <Avatar
        {...extra}
        src={!!sourceHash ? `/api/image/${sourceHash}` : undefined}
        sx={{ width: size, height: size, cursor: "pointer" }}
        ref={ref}
      />
    );
  }
);

export default LinkmeAvatar;
