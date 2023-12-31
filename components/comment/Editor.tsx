import { Button } from "antd";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CustomButton, Wrapper } from "styles/common.styled";
import { CustomEditorProps } from "types/type";

const Editor: React.ComponentType<any> = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
) as React.ComponentType<any>;

export default function CustomEditor({
  editorState,
  readOnly = false,
  onSave,
  onEditorStateChange,
}: CustomEditorProps) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <div className="flex items-center justify-between">
        <Wrapper readOnly={readOnly}>
          <Editor
            readOnly={readOnly}
            editorState={editorState || EditorState.createEmpty()}
            toolbarHidden
            localization={{
              locale: "ko",
            }}
            onEditorStateChange={onEditorStateChange}
          />
        </Wrapper>
        {!readOnly && pathname !== "/products/[id]" && (
          <Button className="w-24 h-10" onClick={onSave}>
            후기 등록
          </Button>
        )}
      </div>
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
