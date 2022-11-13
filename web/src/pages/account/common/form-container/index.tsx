import React, { FC, PropsWithChildren, useMemo } from "react";
import { Card, CircularProgress, Stack } from "@mui/material";
import CenterBox from "../../../../common/components/center-box";
import { useCheckMobile } from "../../../../common/hooks/use-check-mobile";

interface Props extends PropsWithChildren {
  onSubmit?: () => any;
  loading?: boolean;
}

export const FormContainer: FC<Props> = ({ children, onSubmit, loading }) => {
  const { isMobile } = useCheckMobile();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit();
  };

  const render = useMemo(() => {
    if (!loading) {
      return <form onSubmit={handleSubmit}>{children}</form>;
    }
    return (
      <Stack sx={{ py: 8, alignItems: "center" }} spacing={2}>
        <CircularProgress />
        <div>登录信息加载中</div>
      </Stack>
    );
  }, [isMobile, handleSubmit]);

  return (
    <CenterBox sx={{ background: "#E0E0E0" }}>
      <Card
        sx={{
          width: isMobile ? "calc(100% - 64px)" : 380,
          padding: 2,
          marginX: isMobile ? 2 : 0,
        }}
      >
        {render}
      </Card>
    </CenterBox>
  );
};

export default FormContainer;
