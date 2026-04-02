'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useMe } from '@/hooks/queries/useUser';
import { useUpdateProfile } from '@/hooks/mutations/useUpdateProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading } = useMe();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: { name: user?.name ?? '', phone: user?.phone ?? '' },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await updateProfile(values);
      toast.success('프로필이 수정되었습니다.');
      router.push('/mypage');
    } catch {
      toast.error('프로필 수정에 실패했습니다.');
    }
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        로딩 중...
      </div>
    );

  return (
    <main className="min-h-screen pt-16">
      <div className="mx-auto max-w-md px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">프로필 수정</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    전화번호 <span className="text-muted-foreground font-normal">(선택)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="010-0000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                취소
              </Button>
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending ? '저장 중...' : '저장'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
