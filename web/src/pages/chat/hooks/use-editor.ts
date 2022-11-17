import { atom, useRecoilState } from "recoil";

interface IEditor {
  content: string;
}

const editorState = atom<IEditor>({
  key: "chat/editor",
  default: {
    content: "",
  },
});

const useEditor = () => {
  const [editor, setEditor] = useRecoilState(editorState);

  const handleGetContent = () => {
    return editor.content;
  };

  const handleSetContent = (content: string) => {
    setEditor((prev) => ({ ...prev, content }));
  };

  // 清除内容
  const handleClearContent = () => {
    setEditor((prev) => ({ ...prev, content: "" }));
  };

  return {
    editor,
    setEditor,
    handleGetContent,
    handleSetContent,
    handleClearContent,
  };
};

export default useEditor;
