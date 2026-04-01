import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CustomEditorProps } from "types/type";
import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils";

const Editor: React.ComponentType<any> = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
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
      <div className="flex items-center justify-between gap-3">
        <div
          className={cn(
            "flex-1 min-h-[80px] text-sm",
            !readOnly && "border border-border rounded-lg px-3 py-2"
          )}
        >
          <Editor
            readOnly={readOnly}
            editorState={editorState || EditorState.createEmpty()}
            toolbarHidden
            localization={{ locale: "ko" }}
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        {!readOnly && pathname !== "/products/[id]" && (
          <Button size="sm" onClick={onSave}>
            후기 등록
          </Button>
        )}
      </div>
      {pathname !== "/products/[id]" && (
        <div className="mt-5">
          <Button variant="outline" className="w-full" onClick={() => router.back()}>
            다음에 할게요!
          </Button>
        </div>
      )}
    </>
  );
}
