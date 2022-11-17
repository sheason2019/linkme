import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useEditor from "../../hooks/use-editor";

const InitPlugin = () => {
  const { EditorSingleton } = useEditor();

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    EditorSingleton.setEditor(editor);
  }, [editor]);

  return null;
};

export default InitPlugin;
