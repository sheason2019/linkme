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
import LinkmeAvatar from "../../../../../../../../../common/components/linkme-avatar";
import useChat from "../../../../../../../hooks/use-chat";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useMemo, useState } from "react";
import { WithOwner } from "../../../base-info";
import { MessageMember } from "../../../../../../../../../api-lib/chat-client";
import RemoveMemberDialog from "../remove-member-dialog";

interface IDeleteDialog {
  open: boolean;
  member?: MessageMember;
}

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

    return [...ownerList, ...normalList].filter((member) => !member.Removed);
  }, [chat.currentConv?.Members]);

  const [dialog, setDialog] = useState<IDeleteDialog>({
    open: false,
    member: undefined,
  });
  const handleDelete = (member: MessageMember) => {
    setDialog({
      open: true,
      member,
    });
  };
  const handleClose = () => {
    setDialog({
      open: false,
      member: undefined,
    });
  };

  return (
    <>
      <List sx={{ borderRadius: 2, background: "#ECECEC" }}>
        {memberList.map((member) => (
          <ListItem key={member.MemberId}>
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
              <IconButton onClick={() => handleDelete(member)}>
                <CloseIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
      <RemoveMemberDialog
        onClose={handleClose}
        open={dialog.open}
        member={dialog.member}
      />
    </>
  );
};

export default GroupMembers;
