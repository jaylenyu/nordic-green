export const CATEGORY_MAP = ["Plants", "Vase", "GrowingAccessories"];

export const TAKE = 9;

export const FILTERS = [
  { label: "제품명 순", value: "name" },
  { label: "가격 낮은 순", value: "cheap" },
  { label: "가격 높은 순", value: "expensive" },
];

export const getOrderBy = (orderBy?: string) => {
  return orderBy
    ? orderBy === "name"
      ? { orderBy: { name: "asc" } }
      : orderBy === "expensive"
      ? { orderBy: { price: "desc" } }
      : { orderBy: { price: "asc" } }
    : undefined;
};
