import { atom, useRecoilState } from "recoil";
import { getTodoClient } from "../../../../../../api-client";
import useErrorHandler from "../../../../../../common/hooks/use-error-handler";
import useGroup from "../../../../hooks/use-group";
import useTodoStore from "../../../../hooks/use-todo-store";

interface ITodoMenuAtom {
  open: boolean;
  todoId: number;
  fromId: number;
  from: "group" | "todo";

  position: {
    top: number;
    left: number;
  };
}

const todoMenuAtom = atom<ITodoMenuAtom>({
  key: "todo/todo-menu",
  default: {
    todoId: 0,
    fromId: 0,
    open: false,
    from: "group",
    position: { top: 0, left: 0 },
  },
});

const useTodoMenu = () => {
  const { handler } = useErrorHandler();
  const { fetchGroup } = useGroup();
  const { fetchTodoItem } = useTodoStore();
  const [todoMenuState, setTodoMenuState] = useRecoilState(todoMenuAtom);

  const handleOpenMenu = (
    todoId: number,
    position: { top: number; left: number },
    from: "group" | "todo",
    fromId: number
  ) => {
    setTodoMenuState({
      from,
      fromId,
      todoId,
      position,
      open: true,
    });
  };

  const handleCloseMenu = () => {
    setTodoMenuState({
      ...todoMenuState,
      open: false,
    });
  };

  const handleDeleteTodo = async () => {
    const client = getTodoClient();
    const [err] = await client.DeleteTodo(
      todoMenuState.todoId,
      todoMenuState.from,
      todoMenuState.fromId
    );

    if (err) {
      handler(err);
      return;
    }

    if (todoMenuState.from === "group") {
      fetchGroup();
    } else {
      fetchTodoItem(todoMenuState.fromId);
    }
    handleCloseMenu();
  };

  return {
    todoMenuState,

    handleOpenMenu,
    handleCloseMenu,

    handleDeleteTodo,
  };
};

export default useTodoMenu;
