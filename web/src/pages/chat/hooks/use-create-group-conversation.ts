import { atom, useRecoilState } from "recoil";

export interface ICreateGroupConversationForm {
  groupName: string;
  userList: number[];
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
  };
  const handleChangeGroupName = () => {};
  const handleAddGroupMember = () => {};

  return {
    createGroupState,
    setCreateGroupState,
    handleOpenDialog,
    handleCloseDialog,
    resetForm,
    handleChangeGroupName,
    handleAddGroupMember,
  };
};

export default useCreateGroupConversation;
