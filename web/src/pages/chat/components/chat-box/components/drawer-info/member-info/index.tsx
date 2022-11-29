import { Box, Typography, Button } from "@mui/material";
import { FC, useState } from "react";
import GroupMembers from "./components/group-members";
import RowStack from "../../row-stack";
import { WithOwner } from "../base-info";
import InviteMemberDialog from "./components/invite-member-dialog";

const MemberInfo: FC<WithOwner> = ({ isOwner }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box>
        <RowStack>
          <Typography variant="h6">成员信息</Typography>
          {isOwner && <Button onClick={() => setOpen(true)}>邀请</Button>}
        </RowStack>
        <GroupMembers isOwner={isOwner} />
      </Box>
      <InviteMemberDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default MemberInfo;
