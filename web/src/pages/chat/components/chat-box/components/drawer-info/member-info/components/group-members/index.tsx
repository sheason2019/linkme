import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Typography,
  Chip,
  Stack,
  ListItemButton,
} from "@mui/material";
import LinkmeAvatar from "../../../../../../../../../common/components/linkme-avatar";
import useChat from "../../../../../../../hooks/use-chat";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useMemo, useState } from "react";
import { WithOwner } from "../../../base-info";
import { MessageMember } from "../../../../../../../../../api-lib/chat-client";
import RemoveMemberDialog from "../remove-member-dialog";
import { useUserCard } from "../../../../../../../../../common/components/user-card";

interface IDeleteDialog {
  open: boolean;
  member?: MessageMember;
}

const GroupMembers: FC<WithOwner> = ({ isOwner }) => {
  const { handleOpen } = useUserCard();

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
          <ListItemButton
            key={member.MemberId}
            onClick={(e) =>
              handleOpen(e.currentTarget, member.UserId, member.Nickname)
            }
          >
            <ListItemAvatar>
              <LinkmeAvatar sourceHash={member.AvatarUrl} />
            </ListItemAvatar>
            <ListItemText>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>{member.Nickname ?? member.Username}</Typography>
                {member.Type === "owner" && (
                  <Chip label="群主" size="small" color="primary" />
                )}
              </Stack>
            </ListItemText>
            {isOwner && member.MemberId !== chat.currentMemberId && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(member);
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </ListItemButton>
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
