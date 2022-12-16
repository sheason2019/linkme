import { useParams } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { getTodoClient } from "../../../api-client";
import { GroupInfo } from "../../../api-lib/todo-client";
import useErrorHandler from "../../../common/hooks/use-error-handler";

const groupAtom = atom<GroupInfo | undefined>({
  key: "todo/group",
  default: undefined,
});

const useGroup = () => {
  const [groupState, setGroupState] = useRecoilState(groupAtom);
  const { handler, strHandler } = useErrorHandler();
  const params = useParams();

  const groupid = Number(params.groupid);

  const fetchGroup = async () => {
    if (!groupid) {
      strHandler("无法获取当前的GroupID");
      return;
    }
    const client = getTodoClient();
    const [err, res] = await client.GetGroupInfoById(groupid);
    if (err) {
      handler(err);
      return;
    }

    setGroupState(res);
  };

  return {
    groupid,
    groupState,
    fetchGroup,

    setGroupState,
  };
};

export default useGroup;
