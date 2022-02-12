import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface ScriptEditorProps {
  editorState: any;
  setEditorState: any;
}

const ScriptEditor = ({ editorState, setEditorState }: ScriptEditorProps) => {
  return (
    <Editor
      spellCheck
      placeholder="Type your full script body here"
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "list",
          "textAlign",
          "history",
        ],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
      }}
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName + bg-gray-100"
      editorClassName="editorClassName + p-4 border-2 border-neutral-400 mb-3"
    />
  );
};

export default ScriptEditor;
