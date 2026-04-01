'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useEmailLogin } from '@/hooks/mutations/useEmailLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import GoogleLogin from '@/components/Auth/GoogleLogin';

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: emailLogin, isPending } = useEmailLogin();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await emailLogin(values);
      toast.success('로그인되었습니다.');
      router.push('/');
    } catch {
      toast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 pt-16">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="text-sm text-muted-foreground mt-1">계정에 로그인하세요</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="이메일을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="비밀번호를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            또는
          </span>
        </div>

        <GoogleLogin />

        <p className="text-center text-sm text-muted-foreground">
          계정이 없으신가요?{' '}
          <Link href="/auth/signup" className="font-medium text-primary hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
