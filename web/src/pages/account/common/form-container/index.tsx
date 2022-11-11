import { Card } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import CenterBox from "../../../../common/components/center-box";
import { useCheckMobile } from "../../../../common/hooks/use-check-mobile";

export const FormContainer: FC<PropsWithChildren> = ({ children }) => {
  const { isMobile } = useCheckMobile();

  return (
    <CenterBox sx={{ background: "#E0E0E0" }}>
      <Card
        sx={{
          width: isMobile ? "calc(100% - 64px)" : 380,
          padding: 2,
          marginX: isMobile ? 2 : 0,
        }}
      >
        {children}
      </Card>
    </CenterBox>
  );
};

export default FormContainer;
