import { Menu, MenuItem } from "@mui/material";
import useTodoMenu from "./hooks";

const TodoMenu = () => {
  const { todoMenuState, handleCloseMenu, handleDeleteTodo } = useTodoMenu();

  return (
    <Menu
      open={todoMenuState.open}
      onClose={handleCloseMenu}
      anchorReference="anchorPosition"
      anchorPosition={todoMenuState.position}
      onContextMenu={(e) => {
        e.preventDefault();
        handleCloseMenu();
      }}
    >
      <MenuItem sx={{ color: "red" }} onClick={handleDeleteTodo}>
        删除事项
      </MenuItem>
    </Menu>
  );
};

export default TodoMenu;
