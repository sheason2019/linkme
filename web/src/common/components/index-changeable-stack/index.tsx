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
  activeIndex: number;
  elList: Element[];
  previewEl: Element | null;
}

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

  const [keypre, setKeypre] = useState(0);

  const [dragState, setDragState] = useState<IDragState>({
    to: 0,
    from: 0,
    width: 0,
    height: 0,
    activeIndex: -1,
    elList: [],
    previewEl: null,
  });

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
  const handleSetDragHeight = (height: number) => {
    setDragState((prev) => ({ ...prev, height }));
  };
  const handleSetDragWidth = (width: number) => {
    setDragState((prev) => ({ ...prev, width }));
  };
  const handleSetActiveIndex = (index: number) => {
    setDragState((prev) => ({ ...prev, activeIndex: index }));
  };
  const handleSetPreviewEl = (el: Element | null) => {
    setDragState((prev) => ({ ...prev, previewEl: el }));
  };
  const handleResetDragState = () => {
    setDragState({
      to: 0,
      from: 0,
      width: 0,
      height: 0,
      activeIndex: -1,
      elList: [],
      previewEl: null,
    });
  };

  const handleChangeIndex = (cb: () => any) => {
    setTimeout(() => {
      onIndexChange(dragState.from, dragState.to);
      cb();
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
      <Stack spacing={1} {...extra}>
        {childrenArr.map((Item, index) => (
          <ChangeableBox
            key={`${keypre}-${index}`}
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
            handleSetDragWidth={handleSetDragWidth}
            handleSetDragHeight={handleSetDragHeight}
            handleSetActiveIndex={handleSetActiveIndex}
          >
            {Item}
          </ChangeableBox>
        ))}
      </Stack>
      <PreviewSkeleton
        to={dragState.to}
        from={dragState.from}
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
