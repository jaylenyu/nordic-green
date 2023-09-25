import CustomEditor from "@components/Editor";
import { PRODUCT_UPDATE_QUERY_KEY } from "api";
import axios from "axios";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import Image from "next/image";
import { useRouter } from "next/router";
import Carousel from "nuka-carousel";
import { useEffect, useState } from "react";

export default function Products() {
  const [index, setIndex] = useState(0);

  const router = useRouter();
  const { id: productId } = router.query;
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );

  useEffect(() => {
    if (productId != null) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            );
          } else {
            setEditorState(EditorState.createEmpty());
          }
        });
    }
  }, [productId]);

  const handleSave = () => {
    if (editorState && productId != null) {
      fetch(PRODUCT_UPDATE_QUERY_KEY, {
        method: "POST",
        body: JSON.stringify({
          id: productId,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Success");
        });
    } else {
      alert("Failed");
    }
  };
  return (
    <>
      {/* <Carousel
        animation="fade"
        autoplay
        withoutControls
        wrapAround
        speed={10}
        slideIndex={index}
      >
        {images.map((item) => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={100}
            height={60}
            layout="responsive"
          />
        ))}
      </Carousel> */}
      {/* <div>
        {images.map((item, idx) => (
          <div key={idx} onClick={() => setIndex(idx)}>
            <Image src={item.original} alt="image" width={100} height={60} />
          </div>
        ))}
      </div> */}
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  );
}
