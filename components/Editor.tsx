import styled from "@emotion/styled";
import { Button, Rate } from "antd";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CustomButton } from "styles/common.styled";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

export default function CustomEditor({
  editorState,
  readOnly = false,
  onSave,
  onEditorStateChange,
}: {
  editorState: EditorState;
  readOnly?: boolean;
  onSave?: () => void;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
}) {
  return (
    <Wrapper readOnly={readOnly}>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden
        localization={{
          locale: "ko",
        }}
        onEditorStateChange={onEditorStateChange}
      />
      {!readOnly && (
        <Button className="w-24 h-12 m-4" onClick={onSave}>
          Save
        </Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ readOnly: boolean }>`
  ${(props) => (props.readOnly ? "" : "padding: 20px")}
  color: #333;
  ${(props) =>
    props.readOnly ? "" : "border: 1px solid black; border-radius: 8px"}
`;
