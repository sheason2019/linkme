import styled from "@emotion/styled";
import { Backdrop, Box, Stack, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { IMessage } from "..";
import LinkmeAvatar from "../../../../../common/components/linkme-avatar";
import useChat from "../../../hooks/use-chat";
import StatusCircle from "../../status-circle";

const StyledImage = styled.img`
  max-width: 280px;

  cursor: pointer;
`;

const PreviewImage = styled.img`
  max-width: 100%;
`;

const ImageMessage: FC<IMessage> = ({ message }) => {
  const { chat } = useChat();

  const isSelfMsg = message.MemberId === chat.currentMemberId;

  const isGroup = chat.currentConv?.Type === "group";

  const member = useMemo(() => {
    return chat.memberMap.get(message.MemberId);
  }, [chat.currentConv?.Members]);

  const [preview, setPreview] = useState({
    open: false,
    quality: "high",
  });

  const handleClosePreview = () => {
    setPreview((prev) => ({ ...prev, open: false }));
  };

  const handleOpenPreview = () => {
    setPreview((prev) => ({ ...prev, open: true }));
  };

  return (
    <>
      <Stack
        direction={isSelfMsg ? "row" : "row-reverse"}
        justifyContent={isSelfMsg ? "end" : "start"}
        alignItems="center"
      >
        <Stack alignItems={isSelfMsg ? "end" : "start"} sx={{ mr: 1, ml: 0.5 }}>
          {isGroup && (
            <Typography variant="body2">
              {member?.Nickname ?? member?.Username}
            </Typography>
          )}
          <Stack direction={isSelfMsg ? "row" : "row-reverse"}>
            <Box sx={{ alignSelf: "end", mx: 0.5 }}>
              <StatusCircle
                loading={!!message.Mark}
                target={message.TargetCheckedCount}
                current={message.CurrentCheckedCount}
              />
            </Box>
            <Stack
              sx={{
                p: 1,
                minWidth: "1.5rem",
                bgcolor: "skyblue",
                borderRadius: 1,
                whiteSpace: "pre-line",
              }}
              alignItems="center"
            >
              <StyledImage
                onClick={handleOpenPreview}
                src={`/api/image/${message.Content}?quality=low`}
              />
            </Stack>
          </Stack>
        </Stack>
        <Box sx={{ alignSelf: "start" }}>
          <LinkmeAvatar sourceHash={member?.AvatarUrl} />
        </Box>
      </Stack>
      <Backdrop
        sx={{ zIndex: 1200 }}
        open={preview.open}
        onClick={handleClosePreview}
      >
        <PreviewImage src={`/api/image/${message.Content}?quality=origin`} />
      </Backdrop>
    </>
  );
};

export default ImageMessage;
