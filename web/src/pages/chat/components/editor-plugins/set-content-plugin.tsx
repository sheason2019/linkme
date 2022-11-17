import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FC, useEffect } from "react";

interface ISetContentPlugin {
  content: string;
}

const SetContentPlugin: FC<ISetContentPlugin> = ({ content }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditorState(editor.parseEditorState(content));
  }, [content, editor]);

  return null;
};

export default SetContentPlugin;
