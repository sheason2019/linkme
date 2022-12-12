import styled from "@emotion/styled";
import { Divider, ListItemButton, ListItemIcon, Paper } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../../../common/hooks/use-user-info";
import useTodo from "../../hooks/use-todo";
import { useEffect } from "react";

const StyledListItem = styled(ListItemButton)`
  padding-top: 12px;
  padding-bottom: 12px;
`;

const Navigator = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const { todoState, fetchDefaultGroup } = useTodo();

  const username = userInfo.user?.Username;

  const handleToDefaultGroup = () => {
    const { defaultGroupId } = todoState;
    if (defaultGroupId === 0) return;

    navigate(`/${username}/todo/group/${defaultGroupId}`);
  };
  const handleToTodoHome = () => {
    navigate(`/${username}/todo`);
  };

  useEffect(() => {
    fetchDefaultGroup();
  }, []);

  return (
    <Paper sx={{ width: 280, fontSize: 14, py: 1 }}>
      <StyledListItem onClick={handleToTodoHome}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <span>首页</span>
      </StyledListItem>
      <StyledListItem>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <span>计划内</span>
      </StyledListItem>
      <StyledListItem onClick={handleToDefaultGroup}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <span>任务</span>
      </StyledListItem>
      <Divider sx={{ my: 1 }} />
      <StyledListItem>
        <ListItemIcon>
          <PlaylistAddIcon />
        </ListItemIcon>
        <span>添加任务系列</span>
      </StyledListItem>
    </Paper>
  );
};

export default Navigator;
