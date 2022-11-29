import { Box, Typography, Button, Dialog } from "@mui/material";
import { FC, useMemo, useState } from "react";
import useChat from "../../../../../hooks/use-chat";
import InfoPanel from "../../info-panel";
import RowStack from "../../row-stack";
import UpdateSelfInfoDialog from "./components/update-self-info-dialog";

const SelfInfo: FC = () => {
  const { chat } = useChat();

  // 会话信息发生改变时，重新获取当前的用户信息
  const currentMember = useMemo(() => {
    return chat.memberMap.get(chat.currentMemberId!);
  }, [chat.currentConv]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Box>
        <RowStack>
          <Typography variant="h6">个人信息</Typography>
          <Button onClick={() => setOpen(true)}>编辑</Button>
        </RowStack>
        <InfoPanel
          label="群昵称"
          value={currentMember?.Nickname ?? ""}
          placeholder="暂无群昵称"
        />
      </Box>
      <UpdateSelfInfoDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default SelfInfo;
