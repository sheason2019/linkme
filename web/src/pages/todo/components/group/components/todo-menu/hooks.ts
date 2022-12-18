import { OmiError } from "@omi-stack/omi-client/dist/typings";
import { atom, useRecoilState } from "recoil";
import { getTodoClient } from "../../../../../../api-client";
import useErrorHandler from "../../../../../../common/hooks/use-error-handler";
import useGroup from "../../../../hooks/use-group";
import useTodoStore from "../../../../hooks/use-todo-store";

interface ITodoMenuAtom {
  open: boolean;
  itemId: number;
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
    itemId: 0,
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
    itemId: number,
    position: { top: number; left: number },
    from: "group" | "todo",
    fromId: number
  ) => {
    setTodoMenuState({
      from,
      fromId,
      itemId,
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
    let err: OmiError | null = null;
    if (todoMenuState.from === "group") {
      const [error] = await client.DeleteTodo(
        todoMenuState.itemId,
        todoMenuState.fromId
      );
      err = error;
    } else {
      // Delete Step
      const [error] = await client.DeleteTodoStep(todoMenuState.itemId);
      err = error;
    }

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
