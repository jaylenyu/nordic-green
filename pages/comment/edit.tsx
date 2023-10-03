import CustomEditor from "@components/Editor";
import { Button, Rate } from "antd";
import { PRODUCT_UPDATE_QUERY_KEY } from "api";
import axios from "axios";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CustomTitle } from "styles/common.styled";

export default function CommentEdit() {
  const router = useRouter();
  const [rate, setRate] = useState(5);
  const { orderItemIds } = router.query;
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );
  const tooltips = [
    "매우 별로에요",
    "별로에요",
    "보통이에요",
    "좋아요",
    "매우 좋아요",
  ];

  const fetchComment = async () => {
    if (orderItemIds != null) {
      try {
        const response = await axios.get(
          `/api/get-comment?orderItemIds=${orderItemIds}`
        );
        const data = response.data;
        if (data.items.contents) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.items.contents))
            )
          );
          setRate(data.items.rate);
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

  const handleSave = async () => {
    if (editorState && orderItemIds != null) {
      try {
        const response = await axios.post("/api/update-comment", {
          rate: rate,
          orderItemIds: Number(orderItemIds),
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          images: [],
        });
      } catch (error) {
        console.log(error);
      }
      alert("후기 등록 성공!");
      router.back();
    } else {
      alert("후기 등록 실패");
    }
  };

  return (
    <div className="min-h-screen h-full px-80">
      <CustomTitle>후기 작성</CustomTitle>
      {editorState != null && (
        <div>
          <Rate
            tooltips={tooltips}
            defaultValue={5}
            value={rate}
            onChange={setRate}
            allowClear={false}
            className="mb-10"
          />
          {rate ? (
            <Button className="ml-3 text-xs">{tooltips[rate - 1]}</Button>
          ) : (
            ""
          )}
          <CustomEditor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            onSave={handleSave}
          />
        </div>
      )}
    </div>
  );
}
