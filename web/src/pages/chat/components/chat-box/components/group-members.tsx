import { Avatar, Box, Stack } from "@mui/material";
import useChat from "../../../hooks/use-chat";

const GroupMembers = () => {
  const { chat } = useChat();

  return (
    <Stack sx={{ p: 2, borderRadius: 2, background: "#ECECEC" }} spacing={1}>
      {chat.currentConv?.Members.map((member) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar />
          <span>{member.Name}</span>
        </Stack>
      ))}
    </Stack>
  );
};

export default GroupMembers;
