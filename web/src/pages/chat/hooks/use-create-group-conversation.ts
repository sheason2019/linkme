import { useEffect, useRef } from "react";
import { atom, useRecoilState } from "recoil";
import { getChatClient } from "../../../api-client";
import { User } from "../../../api-lib/account-client";
import useErrorHandler from "../../../common/hooks/use-error-handler";
import useUserInfo from "../../../common/hooks/use-user-info";
import useSocket from "./use-socket";

export interface ICreateGroupConversationForm {
  groupName: string;
  userList: User[];
}

export interface ICreateGroupConversationDialog {
  open: boolean;
}

export interface ICreateGroupConversation {
  dialog: ICreateGroupConversationDialog;
  form: ICreateGroupConversationForm;
}

const DEFAULT_FORM = {
  groupName: "",
  userList: [],
};

const createGroupConversationState = atom<ICreateGroupConversation>({
  key: "chat/create-group-conversation",
  default: {
    dialog: { open: false },
    form: DEFAULT_FORM,
  },
});

const useCreateGroupConversation = () => {
  const { userInfo } = useUserInfo();

  const { strHandler, handler } = useErrorHandler();
  const userSetRef = useRef(new Set<number>());
  const { handleToConversation } = useSocket();

  const [createGroupState, setCreateGroupState] = useRecoilState(
    createGroupConversationState
  );

  const handleOpenDialog = () => {
    setCreateGroupState((prev) => ({ ...prev, dialog: { open: true } }));
  };
  const handleCloseDialog = () => {
    setCreateGroupState((prev) => ({ ...prev, dialog: { open: false } }));
  };

  const resetForm = () => {
    setCreateGroupState((prev) => ({ ...prev, form: DEFAULT_FORM }));
    userSetRef.current = new Set();
  };
  const handleChangeGroupName = (name: string) => {
    setCreateGroupState((prev) => ({
      ...prev,
      form: { ...prev.form, groupName: name },
    }));
  };
  const handleAddGroupMember = (user: User) => {
    // 需要进行一次重的去
    if (
      userSetRef.current.has(user.UserId) ||
      user.UserId === userInfo.user?.UserId
    ) {
      strHandler("成员已存在");
      return;
    }

    // 添加
    setCreateGroupState((prev) => ({
      ...prev,
      form: { ...prev.form, userList: [...prev.form.userList, user] },
    }));
    userSetRef.current.add(user.UserId);
  };
  const handleRemoveGroupMember = (userId: number) => {
    setCreateGroupState((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        userList: prev.form.userList.filter((user) => user.UserId !== userId),
      },
    }));
    userSetRef.current.delete(userId);
  };
  const handleSubmit = async () => {
    const client = getChatClient();
    const [err, res] = await client.CreateGroupConversation(
      createGroupState.form.userList.map((user) => user.UserId),
      createGroupState.form.groupName
    );

    if (err) {
      handler(err);
      return;
    }

    handleCloseDialog();
    handleToConversation(res);
  };

  return {
    createGroupState,
    setCreateGroupState,
    handleOpenDialog,
    handleCloseDialog,
    handleChangeGroupName,
    handleAddGroupMember,
    handleRemoveGroupMember,
    resetForm,
    handleSubmit,
  };
};

export default useCreateGroupConversation;
