import { useParams } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { getTodoClient } from "../../../api-client";
import useErrorHandler from "../../../common/hooks/use-error-handler";

interface ITodoAtom {
  defaultGroupId: number;
}

const todoAtom = atom<ITodoAtom>({
  key: "todo/common",
  default: {
    defaultGroupId: 0,
  },
});

const useTodo = () => {
  const [todoState, setTodoState] = useRecoilState(todoAtom);

  const { handler, strHandler } = useErrorHandler();
  const { username } = useParams();

  const fetchDefaultGroup = async () => {
    if (!username) {
      throw strHandler("获取默认GroupID失败");
    }

    const client = getTodoClient();
    const [err, res] = await client.GetDefaultGroup(username);
    if (err) {
      handler(err);
      return;
    }

    setTodoState({
      defaultGroupId: res.GroupId,
    });
  };

  return {
    todoState,
    setTodoState,
    fetchDefaultGroup,
  };
};

export default useTodo;
