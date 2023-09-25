import { InputNumber } from "antd";

interface CountControlProps {
  value: number | undefined;
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function CountControl({ value, setValue }: CountControlProps) {
  const onChange = (value: number | null) => {
    setValue(value || undefined);
  };

  return <InputNumber min={1} max={10} value={value} onChange={onChange} />;
}
