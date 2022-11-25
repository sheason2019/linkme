import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import LinkmeAvatar from "../../../../../common/components/linkme-avatar";
import useChat from "../../../hooks/use-chat";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useMemo } from "react";
import { WithOwner } from "./drawer-info/base-info";
import { Tag } from "@mui/icons-material";
import { MessageMember } from "../../../../../api-lib/chat-client";

const GroupMembers: FC<WithOwner> = ({ isOwner }) => {
  const { chat } = useChat();

  // 成员展示顺序这块儿得有些讲究，目前先按身份优先展示群主用户，后续可能需要按26个字母的顺序进行编排
  const memberList = useMemo(() => {
    const members = chat.currentConv?.Members;
    if (!members) return [];

    const ownerList: MessageMember[] = [];
    const normalList: MessageMember[] = [];
    members.forEach((member) => {
      member.Type === "owner"
        ? ownerList.push(member)
        : normalList.push(member);
    });

    return [...ownerList, ...normalList];
  }, [chat.currentConv?.Members]);

  return (
    <List sx={{ borderRadius: 2, background: "#ECECEC" }}>
      {memberList.map((member) => (
        <ListItem>
          <ListItemAvatar>
            <LinkmeAvatar sourceHash={member.AvatarUrl} />
          </ListItemAvatar>
          <ListItemText>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>{member.Name}</Typography>
              {member.Type === "owner" && (
                <Chip label="群主" size="small" color="primary" />
              )}
            </Stack>
          </ListItemText>
          {isOwner && member.MemberId !== chat.currentMemberId && (
            <IconButton>
              <CloseIcon />
            </IconButton>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default GroupMembers;
