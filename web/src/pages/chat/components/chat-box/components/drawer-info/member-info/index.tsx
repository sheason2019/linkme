import { Box, Typography, Button } from "@mui/material";
import { FC } from "react";
import GroupMembers from "../../group-members";
import RowStack from "../../row-stack";
import { WithOwner } from "../base-info";

const MemberInfo: FC<WithOwner> = ({ isOwner }) => {
  return (
    <Box>
      <RowStack>
        <Typography variant="h6">成员信息</Typography>
        {isOwner && <Button>邀请</Button>}
      </RowStack>
      <GroupMembers isOwner={isOwner} />
    </Box>
  );
};

export default MemberInfo;
