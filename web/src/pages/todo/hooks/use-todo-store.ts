import _ from "lodash";
import { atom, useRecoilState } from "recoil";
import { OmiError } from "@omi-stack/omi-client/dist/typings";

import { getTodoClient } from "../../../api-client";
import { TodoItem } from "../../../api-lib/todo-client";
import useErrorHandler from "../../../common/hooks/use-error-handler";
import { TodoItemStatus } from "../typings";

// 使用一个全局Map来存储Todo信息
interface ITodoStoreAtom {
  store: Record<number, TodoItem | undefined>;
}

const todoStoreAtom = atom<ITodoStoreAtom>({
  key: "todo/todo-store",
  default: {
    store: {},
  },
});

let patchList: number[] = [];
// 使用批处理处理从服务器拉取TodoItem信息
const patchTodoItem = _.debounce(
  async (
    handler: (err: OmiError) => void,
    setter: (todoItems: TodoItem[]) => any
  ) => {
    const client = getTodoClient();

    const [err, res] = await client.GetTodoItemsByIdList(patchList);
    if (err) {
      handler(err);
      return;
    }

    patchList = [];
    setter(res);
  },
  300,
  { trailing: true }
);

const useTodoStore = () => {
  const { handler } = useErrorHandler();
  const [todoStore, setTodoStore] = useRecoilState(todoStoreAtom);

  const fetchTodoItem = (todoId: number) => {
    patchList.push(todoId);
    patchTodoItem(handler, handleSetTodoItems);
  };

  const handleSetTodoItems = (todoItems: TodoItem[]) => {
    const store = { ...todoStore.store };

    for (let item of todoItems) {
      store[item.Id] = item;
    }
    setTodoStore({ store });
  };

  // 切换边界时清空TodoItem
  const handleClearTodoItems = () => {
    setTodoStore({ store: {} });
  };

  const handleCompleteTodo = async (id: number) => {
    const todo = todoStore.store[id];
    if (!todo) return;

    const item = { ...todo };
    item.Status = TodoItemStatus.Finished;
    handleSetTodoItems([item]);
    const client = getTodoClient();
    const [err, _] = await client.PutTodo(item);
    if (err) {
      handler(err);
      return;
    }

    fetchTodoItem(id);
  };

  const handleUncompleteTodo = async (id: number) => {
    const todo = todoStore.store[id];
    if (!todo) return;

    const item = { ...todo };
    item.Status = TodoItemStatus.Waiting;
    handleSetTodoItems([item]);
    const client = getTodoClient();
    const [err, _] = await client.PutTodo(item);
    if (err) {
      handler(err);
      return;
    }

    fetchTodoItem(id);
  };

  const handleChangeTodoContent = async (id: number, content: string) => {
    const todo = todoStore.store[id];
    if (!todo) return;

    const item = { ...todo };
    item.Content = content;
    handleSetTodoItems([item]);
    const client = getTodoClient();
    const [err, _] = await client.PutTodo(item);
    if (err) {
      handler(err);
      return;
    }

    fetchTodoItem(id);
  };

  return {
    todoStore,
    setTodoStore,

    fetchTodoItem,

    handleSetTodoItems,
    handleCompleteTodo,
    handleUncompleteTodo,
    handleChangeTodoContent,
  };
};

export default useTodoStore;
