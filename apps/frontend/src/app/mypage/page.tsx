'use client';

import { useRouter } from 'next/navigation';
import { Avatar, Card, Progress, Tag } from 'antd';
import { UserOutlined, TrophyOutlined, WalletOutlined, ShoppingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useMe } from '@/hooks/queries/useUser';

const GRADE_COLORS: Record<number, string> = {
  0: 'default',
  1: 'silver',
  2: 'gold',
  3: 'volcano',
};

const GRADE_LABELS: Record<number, string> = {
  0: '일반',
  1: '실버',
  2: '골드',
  3: 'VIP',
};

export default function MyPage() {
  const router = useRouter();
  const { data: user, isLoading } = useMe();

  if (isLoading) return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const menuItems = [
    { icon: <UserOutlined />, label: '프로필 수정', href: '/mypage/profile' },
    { icon: <ShoppingOutlined />, label: '주문 내역', href: '/mypage/orders' },
    { icon: <WalletOutlined />, label: '포인트 내역', href: '/mypage/points' },
  ];

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">마이페이지</h1>

      {/* 프로필 카드 */}
      <Card className="mb-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar src={user.image} size={64} icon={<UserOutlined />} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{user.name}</span>
              <Tag color={GRADE_COLORS[user.grade]}>{GRADE_LABELS[user.grade]}</Tag>
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </Card>

      {/* 등급 & 포인트 카드 */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <Card className="rounded-2xl shadow-sm text-center">
          <TrophyOutlined className="mb-2 text-3xl text-yellow-500" />
          <p className="text-sm text-gray-500">보유 포인트</p>
          <p className="text-2xl font-bold text-green-700">{user.points.toLocaleString()}P</p>
        </Card>

        <Card className="rounded-2xl shadow-sm text-center">
          <WalletOutlined className="mb-2 text-3xl text-blue-500" />
          <p className="text-sm text-gray-500">누적 구매액</p>
          <p className="text-2xl font-bold text-gray-800">
            ₩{user.totalSpent.toLocaleString()}
          </p>
        </Card>
      </div>

      {/* 등급 진행도 */}
      {user.nextGradeLabel && (
        <Card className="mb-6 rounded-2xl shadow-sm">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{GRADE_LABELS[user.grade]}</span>
            <span>{user.nextGradeLabel} 달성까지 ₩{(user.nextGradeThreshold - user.totalSpent).toLocaleString()}</span>
          </div>
          <Progress percent={user.gradeProgress} strokeColor="#158041" showInfo={false} />
        </Card>
      )}

      {/* 메뉴 */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card
              hoverable
              className="rounded-2xl shadow-sm transition-all"
              bodyStyle={{ padding: '16px 24px' }}
            >
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                <span className="ml-auto text-gray-400">›</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
