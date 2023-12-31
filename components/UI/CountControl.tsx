import { InputNumber } from "antd";

interface CountControlProps {
  value: number | undefined;
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  disabled: boolean;
}

export default function CountControl({
  value,
  setValue,
  disabled,
}: CountControlProps) {
  const onChange = (value: number | null) => {
    setValue(value || undefined);
  };

  return (
    <InputNumber
      className="w-16 sm:w-12 sx:w-12"
      disabled={disabled}
      controls={true}
      min={1}
      max={10}
      value={value}
      onChange={onChange}
    />
  );
}
