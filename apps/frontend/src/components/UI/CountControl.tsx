'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CountControlProps {
  value: number | undefined;
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  disabled: boolean;
}

export default function CountControl({ value, setValue, disabled }: CountControlProps) {
  const current = value ?? 1;

  const decrement = () => {
    if (current > 1) setValue(current - 1);
  };

  const increment = () => {
    if (current < 10) setValue(current + 1);
  };

  return (
    <div
      className={cn(
        'flex items-center border border-border rounded-md',
        disabled && 'opacity-50 pointer-events-none',
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-r-none"
        onClick={decrement}
        disabled={disabled || current <= 1}
      >
        <Minus className="w-3 h-3" />
      </Button>
      <span className="w-8 text-center text-sm font-medium select-none">{current}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-l-none"
        onClick={increment}
        disabled={disabled || current >= 10}
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
}
