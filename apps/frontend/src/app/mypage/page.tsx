'use client';

import { useRouter } from 'next/navigation';
import { User, Trophy, Wallet, ShoppingBag, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useMe } from '@/hooks/queries/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const GRADE_LABELS: Record<number, string> = { 0: '일반', 1: '실버', 2: '골드', 3: 'VIP' };
const GRADE_CLASS: Record<number, string> = {
  0: 'bg-muted text-muted-foreground border-0',
  1: 'bg-slate-200 text-slate-700 border-0',
  2: 'bg-yellow-100 text-yellow-800 border-0',
  3: 'bg-orange-100 text-orange-800 border-0',
};

export default function MyPage() {
  const router = useRouter();
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">로딩 중...</div>;
  }
  if (!user) { router.push('/auth/login'); return null; }

  const menuItems = [
    { icon: User, label: '프로필 수정', href: '/mypage/profile' },
    { icon: ShoppingBag, label: '주문 내역', href: '/mypage/orders' },
    { icon: Wallet, label: '포인트 내역', href: '/mypage/points' },
  ];

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-lg mx-auto px-4 py-10 space-y-4">
        <h1 className="text-2xl font-bold mb-6">마이페이지</h1>

        {/* 프로필 */}
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback className="text-lg">{user.name?.charAt(0) ?? <User />}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{user.name}</span>
                <Badge className={cn(GRADE_CLASS[user.grade])}>{GRADE_LABELS[user.grade]}</Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* 포인트 & 구매액 */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Trophy className="w-7 h-7 mx-auto mb-2 text-yellow-500" />
              <p className="text-xs text-muted-foreground">보유 포인트</p>
              <p className="text-xl font-bold text-primary mt-0.5">{user.points.toLocaleString()}P</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Wallet className="w-7 h-7 mx-auto mb-2 text-blue-500" />
              <p className="text-xs text-muted-foreground">누적 구매액</p>
              <p className="text-xl font-bold mt-0.5">₩{user.totalSpent.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* 등급 진행도 */}
        {user.nextGradeLabel && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{GRADE_LABELS[user.grade]}</span>
                <span>{user.nextGradeLabel}까지 ₩{(user.nextGradeThreshold - user.totalSpent).toLocaleString()}</span>
              </div>
              <Progress value={user.gradeProgress} />
            </CardContent>
          </Card>
        )}

        {/* 메뉴 */}
        <div className="space-y-2">
          {menuItems.map(({ icon: Icon, label, href }) => (
            <Link key={href} href={href}>
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="py-4 px-5 flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-sm flex-1">{label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
