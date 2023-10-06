import styled from "@emotion/styled";
import { Button } from "antd";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
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
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <Wrapper readOnly={readOnly} className="relative">
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          toolbarHidden
          localization={{
            locale: "ko",
          }}
          onEditorStateChange={onEditorStateChange}
        />
        {!readOnly && pathname !== "/products/[id]" && (
          <Button
            className="w-24 h-10 absolute top-2 right-2 z-10"
            onClick={onSave}
          >
            후기 등록
          </Button>
        )}
      </Wrapper>
      <div className="my-5">
        {pathname !== "/products/[id]" && (
          <CustomButton onClick={() => router.back()}>
            다음에 할게요!
          </CustomButton>
        )}
      </div>
    </>
  );
}

const Wrapper = styled.div<{ readOnly: boolean }>`
  ${(props) => (props.readOnly ? "" : "width: 100%")}
  ${(props) => (props.readOnly ? "" : "padding: 20px")}
  color: #333;
  ${(props) =>
    props.readOnly
      ? ""
      : "border: 1px solid rgba(0,0,0,0.1); border-radius: 8px"}
`;
