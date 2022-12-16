import { Box } from "@mui/material";
import { FC, useEffect, useMemo, useRef } from "react";

interface IProps {
  show: boolean;
  to: number;
  from: number;
  width: number;
  height: number;
  elList: Element[];
  handleSetPreviewEl: (el: Element | null) => any;
}

const PreviewSkeleton: FC<IProps> = ({
  show,
  width,
  height,
  from,
  to,
  elList,
  handleSetPreviewEl,
}) => {
  const position = useMemo(() => {
    const parent = elList[to]?.parentElement;
    if (!parent) return {};

    if (from >= to) {
      return { top: parent.offsetTop };
    } else {
      return { top: parent.offsetTop + parent.offsetHeight - height };
    }
  }, [from, to, elList]);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      handleSetPreviewEl(rootRef.current);
    } else {
      handleSetPreviewEl(null);
    }
  }, [rootRef, show]);

  if (!show) return null;

  return (
    <Box
      ref={rootRef}
      sx={{
        ...position,
        transition: "top 400ms",
        borderRadius: 1,
        width,
        height,
        position: "absolute",
        background: "rgba(0, 0, 0, 0.05)",
      }}
    />
  );
};

export default PreviewSkeleton;
