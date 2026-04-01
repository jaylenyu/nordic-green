'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Coins } from 'lucide-react';
import { useMe, usePointHistory } from '@/hooks/queries/useUser';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const REASON_LABEL: Record<string, string> = {
  purchase: '구매 적립',
  cancel: '취소 차감',
  use: '포인트 사용',
  admin: '관리자 지급',
};

export default function PointsPage() {
  const { data: user } = useMe();
  const { data: history, isLoading } = usePointHistory();

  return (
    <main className="min-h-screen pt-16">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-2 text-2xl font-bold">포인트 내역</h1>
        <p className="mb-6 text-lg font-semibold text-primary">
          현재 보유: {user?.points?.toLocaleString() ?? 0}P
        </p>

        {isLoading ? (
          <div className="flex justify-center py-20 text-muted-foreground">로딩 중...</div>
        ) : !history?.length ? (
          <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
            <Coins className="w-12 h-12" />
            <p>포인트 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item: any) => (
              <Card key={item.id}>
                <CardContent className="py-3 px-5 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{REASON_LABEL[item.reason] ?? item.reason}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {format(new Date(item.createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })}
                    </p>
                  </div>
                  <span className={cn('font-bold text-base', item.amount > 0 ? 'text-primary' : 'text-destructive')}>
                    {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}P
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
