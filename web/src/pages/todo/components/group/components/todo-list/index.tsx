import { useMemo } from "react";
import IndexChangeableStack from "../../../../../../common/components/index-changeable-stack";
import useGroup from "../../../../hooks/use-group";
import TodoItem from "../todo-item";
import TodoMenu from "../todo-menu";

const TodoList = () => {
  const { groupState, setGroupState } = useGroup();

  const todoList = useMemo(() => {
    if (!groupState) return [];

    return groupState.TodoList;
  }, [groupState]);

  const handleIndexChange = (from: number, to: number) => {
    const list = [...todoList];
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);

    setGroupState({...groupState!, TodoList: list})
  };

  return (
    <>
      <IndexChangeableStack sx={{ mt: 2 }} spacing={1} onIndexChange={handleIndexChange}>
        {todoList.map((item) => (
          <TodoItem key={item} todoId={item} />
        ))}
      </IndexChangeableStack>
      <TodoMenu />
    </>
  );
};

export default TodoList;
