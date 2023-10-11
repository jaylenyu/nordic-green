import { useState, useEffect } from "react";
import axios from "axios";
import { EditorState, convertFromRaw } from "draft-js";
import { useOrder } from "hooks/queries/useQuery";

export default function useComment(orderItemIds: string | undefined) {
  const { data } = useOrder();

  const commentProduct = data
    ?.find((item) =>
      item.orderItems.some((orderItem) => orderItem.id === Number(orderItemIds))
    )
    ?.orderItems.find((orderItem) => orderItem.id === Number(orderItemIds));

  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );

  const fetchComment = async () => {
    if (orderItemIds != null) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/get?orderItemIds=${orderItemIds}`
        );
        const data = response.data;
        if (data.items.contents) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.items.contents))
            )
          );
        } else {
          setEditorState(EditorState.createEmpty());
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchComment();
  }, [orderItemIds]);

  return {
    commentProduct,
    editorState,
    setEditorState,
  };
}
