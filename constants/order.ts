export const getOrderBy = (orderBy?: string) => {
  return orderBy
    ? orderBy === "name"
      ? { orderBy: { name: "asc" } }
      : orderBy === "expensive"
      ? { orderBy: { price: "desc" } }
      : { orderBy: { price: "asc" } }
    : undefined;
};

export const ORDER_STATUS_MAP = [
  "주문취소",
  "주문대기",
  "결제준비",
  "결제완료",
  "배송준비",
  "배송중",
  "배송완료",
  "환불신청",
  "환불완료",
  "반품신청",
  "반품완료",
];
