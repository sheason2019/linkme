import { Box, Stack, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { IMessage } from "..";
import LinkmeAvatar from "../../../../../common/components/linkme-avatar";
import useChat from "../../../hooks/use-chat";
import StatusCircle from "../../status-circle";

const UserMessage: FC<IMessage> = ({ message }) => {
  const { chat } = useChat();

  const isSelfMsg = message.MemberId === chat.currentMemberId;

  const isGroup = chat.currentConv?.Type === "group";

  const member = useMemo(() => {
    return chat.memberMap.get(message.MemberId);
  }, [chat.currentConv?.Members]);

  return (
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
            {message.Content}
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ alignSelf: "start" }}>
        <LinkmeAvatar sourceHash={member?.AvatarUrl} />
      </Box>
    </Stack>
  );
};

export default UserMessage;
