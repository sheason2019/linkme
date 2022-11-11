import React, { FC, PropsWithChildren } from "react";
import { Card } from "@mui/material";
import CenterBox from "../../../../common/components/center-box";
import { useCheckMobile } from "../../../../common/hooks/use-check-mobile";

interface Props extends PropsWithChildren {
  onSubmit: () => any;
}

export const FormContainer: FC<Props> = ({ children, onSubmit }) => {
  const { isMobile } = useCheckMobile();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <CenterBox sx={{ background: "#E0E0E0" }}>
      <Card
        sx={{
          width: isMobile ? "calc(100% - 64px)" : 380,
          padding: 2,
          marginX: isMobile ? 2 : 0,
        }}
      >
        <form onSubmit={handleSubmit}>{children}</form>
      </Card>
    </CenterBox>
  );
};

export default FormContainer;
