import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({
  value,
  onChange,
  disabled = false,
  max = 5,
  size = 'md',
}: StarRatingProps) {
  const sizeClass = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-6 h-6' }[size];

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.round(value);
        return (
          <button
            key={i}
            type="button"
            disabled={disabled || !onChange}
            onClick={() => onChange?.(i + 1)}
            className={cn(
              'transition-transform focus:outline-none',
              !disabled && onChange && 'hover:scale-110 cursor-pointer',
              (disabled || !onChange) && 'cursor-default',
            )}
          >
            <Star
              className={cn(
                sizeClass,
                filled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-transparent text-muted-foreground/40',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
