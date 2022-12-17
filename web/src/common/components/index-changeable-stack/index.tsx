import { FC, ReactNode, useMemo, useRef, useState } from "react";
import { Box, Stack, StackTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

import ChangeableBox from "./components/changeable-box";
import PreviewSkeleton from "./components/preview-skeleton";

interface IDragState {
  to: number;
  from: number;
  width: number;
  height: number;
  left: number;
  activeIndex: number;
  elList: Element[];
  previewEl: Element | null;
}

const DEFAULT_DRAG_STATE: IDragState = {
  to: 0,
  from: 0,
  width: 0,
  height: 0,
  left: 0,
  activeIndex: -1,
  elList: [],
  previewEl: null,
};

interface IProps
  extends DefaultComponentProps<
    StackTypeMap<
      {
        onIndexChange: (from: number, to: number) => any;
      },
      "div"
    >
  > {}

// 可拖动转换Item顺序的Stack
const IndexChangeableStack: FC<IProps> = (props) => {
  const { onIndexChange, ...extra } = props;

  const [dragState, setDragState] = useState<IDragState>(DEFAULT_DRAG_STATE);

  const handleUploadEl = (index: number, el: Element) => {
    setDragState((prev) => {
      const list = [...prev.elList];
      list[index] = el;
      return { ...prev, elList: list };
    });
  };
  const handleSetDragFrom = (from: number) => {
    setDragState((prev) => ({ ...prev, from }));
  };
  const handleSetDragTo = (to: number) => {
    setDragState((prev) => ({ ...prev, to }));
  };
  const handleSetDragSize = (width: number, height: number, left: number) => {
    setDragState((prev) => ({ ...prev, width, height, left }));
  };
  const handleSetActiveIndex = (index: number) => {
    setDragState((prev) => ({ ...prev, activeIndex: index }));
  };
  const handleSetPreviewEl = (el: Element | null) => {
    setDragState((prev) => ({ ...prev, previewEl: el }));
  };
  const handleResetDragState = () => setDragState(DEFAULT_DRAG_STATE);

  const handleChangeIndex = (cb: () => any) => {
    setTimeout(() => {
      onIndexChange(dragState.from, dragState.to);
      cb();

      setTimeout(() => handleResetDragState(), 0);
    }, 500);
  };

  const children = props.children;

  const childrenArr: ReactNode[] = useMemo(() => {
    handleResetDragState();
    if (!children) return [];

    if (!Array.isArray(children)) {
      return [children];
    }

    return children;
  }, [children]);

  return (
    <Box sx={{ position: "relative" }}>
      <Stack {...extra}>
        {childrenArr.map((Item, index) => (
          <ChangeableBox
            key={index}
            index={index}
            to={dragState.to}
            from={dragState.from}
            elList={dragState.elList}
            dragWidth={dragState.width}
            previewEl={dragState.previewEl}
            spacing={Number(props.spacing) ?? 0}
            dragHeight={dragState.height}
            activeIndex={dragState.activeIndex}
            handleUploadEl={handleUploadEl}
            handleSetDragTo={handleSetDragTo}
            handleSetDragFrom={handleSetDragFrom}
            handleChangeIndex={handleChangeIndex}
            handleSetDragSize={handleSetDragSize}
            handleSetActiveIndex={handleSetActiveIndex}
          >
            {Item}
          </ChangeableBox>
        ))}
      </Stack>
      <PreviewSkeleton
        to={dragState.to}
        from={dragState.from}
        left={dragState.left}
        width={dragState.width}
        height={dragState.height}
        elList={dragState.elList}
        show={dragState.activeIndex !== -1}
        handleSetPreviewEl={handleSetPreviewEl}
      />
    </Box>
  );
};

export default IndexChangeableStack;
