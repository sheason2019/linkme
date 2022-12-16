import { useMemo } from "react";
import { getTodoClient } from "../../../../../../api-client";
import IndexChangeableStack from "../../../../../../common/components/index-changeable-stack";
import useErrorHandler from "../../../../../../common/hooks/use-error-handler";
import useGroup from "../../../../hooks/use-group";
import TodoItem from "../todo-item";
import TodoMenu from "../todo-menu";

const TodoList = () => {
  const { handler } = useErrorHandler();
  const { groupState, setGroupState, fetchGroup } = useGroup();

  const todoList = useMemo(() => {
    if (!groupState) return [];

    return groupState.TodoList;
  }, [groupState]);

  const handleIndexChange = async (from: number, to: number) => {
    const list = [...todoList];
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);

    const group = { ...groupState!, TodoList: list };
    setGroupState(group);

    const client = getTodoClient();
    const [err] = await client.PutGroup(group);
    if (err) {
      handler(err);
      return;
    }

    fetchGroup();
  };

  return (
    <>
      <IndexChangeableStack
        sx={{ mt: 2 }}
        spacing={1}
        onIndexChange={handleIndexChange}
      >
        {todoList.map((item) => (
          <TodoItem key={item} todoId={item} />
        ))}
      </IndexChangeableStack>
      <TodoMenu />
    </>
  );
};

export default TodoList;
