'use client';

import { Card, Empty, Tag } from 'antd';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMe, usePointHistory } from '@/hooks/queries/useUser';

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
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">포인트 내역</h1>
      <p className="mb-6 text-lg text-green-700 font-semibold">
        현재 보유 포인트: {user?.points?.toLocaleString() ?? 0}P
      </p>

      {isLoading ? (
        <div className="text-center text-gray-400">로딩 중...</div>
      ) : !history?.length ? (
        <Empty description="포인트 내역이 없습니다." />
      ) : (
        <div className="space-y-3">
          {history.map((item: any) => (
            <Card key={item.id} className="rounded-2xl shadow-sm" bodyStyle={{ padding: '12px 20px' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{REASON_LABEL[item.reason] ?? item.reason}</p>
                  <p className="text-xs text-gray-400">
                    {format(new Date(item.createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })}
                  </p>
                </div>
                <Tag color={item.amount > 0 ? 'success' : 'error'} className="text-base font-bold">
                  {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}P
                </Tag>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
