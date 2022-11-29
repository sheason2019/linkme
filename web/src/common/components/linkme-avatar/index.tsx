import { Avatar, AvatarTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { forwardRef } from "react";

interface ILinkmeAvatar
  extends DefaultComponentProps<AvatarTypeMap<{}, "div">> {
  sourceHash?: string;
  size?: number;
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
