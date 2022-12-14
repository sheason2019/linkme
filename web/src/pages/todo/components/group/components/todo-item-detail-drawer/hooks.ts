import { useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import useTodoStore from "../../../../hooks/use-todo-store";

interface ITodoItemDetailAtom {
  open: boolean;
  itemId: number;
}

const todoItemDetailAtom = atom<ITodoItemDetailAtom>({
  key: "todo/todo-item-detail",
  default: {
    open: false,
    itemId: 0,
  },
});

const useTodoItemDetail = () => {
  const { todoStore, fetchTodoItem } = useTodoStore();
  const [detailState, setDetailState] = useRecoilState(todoItemDetailAtom);

  const todoItem = useMemo(() => {
    if (detailState.itemId === 0) return undefined;

    const item = todoStore.store[detailState.itemId];
    if (!item) {
      fetchTodoItem(detailState.itemId);
    }

    return item;
  }, [todoStore.store, detailState.itemId]);

  const handleOpenDrawer = (todoId: number) => {
    setDetailState({
      open: true,
      itemId: todoId,
    });
  };

  const handleCloseDrawer = () => {
    setDetailState({
      open: false,
      itemId: 0,
    });
  };

  return {
    todoItem,
    detailState,
    setDetailState,

    handleOpenDrawer,
    handleCloseDrawer,
  };
};

export default useTodoItemDetail;
