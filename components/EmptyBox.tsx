import { Empty } from "antd";
import { useRouter } from "next/router";

export default function EmptyBox() {
  const router = useRouter();

  const messages: { [key: string]: string } = {
    "/": "검색한 제품이 없습니다.",
    "/wishlist": "찜한 제품이 없습니다.",
    "/cart": "장바구니에 제품이 없습니다.",
    "/order": "주문한 제품이 없습니다.",
  };

  return (
    <div className="flex flex-col justify-center items-center h-80">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <div>{messages[router.pathname]}</div>
    </div>
  );
}
