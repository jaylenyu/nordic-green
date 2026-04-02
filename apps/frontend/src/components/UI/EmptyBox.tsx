'use client';

import { PackageOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function EmptyBox() {
  const pathname = usePathname();

  const messages: { [key: string]: string } = {
    '/': '검색한 제품이 없습니다.',
    '/wishlist': '찜한 제품이 없습니다.',
    '/cart': '장바구니에 제품이 없습니다.',
    '/order': '주문한 제품이 없습니다.',
  };

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
      <PackageOpen className="w-12 h-12 opacity-40" />
      <p className="text-sm">{messages[pathname] ?? '항목이 없습니다.'}</p>
    </div>
  );
}
