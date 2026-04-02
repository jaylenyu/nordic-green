'use client';

import { products } from '@prisma/client';
import { CATEGORY_MAP } from 'constants/products';
import useValidation from '@/hooks/useValidation';
import { ShoppingCart } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProductCard({ products }: { products: products }) {
  const router = useRouter();
  const { data: session } = useSession();
  const validate = useValidation(products);
  const { id, name, image_url, category_id, price } = products;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      toast.error('로그인이 필요합니다.');
      signIn();
      return;
    }
    validate('cart', 1);
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
      onClick={() => router.push(`/products/${id}`)}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <Image
          alt={name}
          src={image_url ?? ''}
          width={400}
          height={400}
          priority
          unoptimized
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Cart button on hover */}
      <button
        onClick={handleAddToCart}
        className="absolute bottom-[72px] right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary text-primary-foreground rounded-md p-2 z-10"
        aria-label="장바구니에 추가"
      >
        <ShoppingCart className="w-4 h-4" />
      </button>

      <div className="p-3">
        <p className="font-semibold text-sm truncate">{name}</p>
        <p className="text-xs text-muted-foreground hidden lg:block mt-0.5">
          {CATEGORY_MAP[category_id - 1]}
        </p>
        <p className="text-sm font-medium mt-1">{price.toLocaleString()} ₩</p>
      </div>
    </div>
  );
}
