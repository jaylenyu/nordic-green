import { Empty } from "antd";

export default function EmptyBox() {
  return (
    <div className="flex justify-center items-center h-full">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
}
