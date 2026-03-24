'use client';

import { useRouter } from 'next/navigation';
import { Button, Form, Input, message } from 'antd';
import { useMe } from '@/hooks/queries/useUser';
import { useUpdateProfile } from '@/hooks/mutations/useUpdateProfile';

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading } = useMe();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const onFinish = async (values: { name: string; phone?: string }) => {
    try {
      await updateProfile(values);
      message.success('프로필이 수정되었습니다.');
      router.push('/mypage');
    } catch {
      message.error('프로필 수정에 실패했습니다.');
    }
  };

  if (isLoading) return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">프로필 수정</h1>

      <Form layout="vertical" initialValues={{ name: user?.name, phone: user?.phone }} onFinish={onFinish}>
        <Form.Item name="name" label="이름" rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
          <Input size="large" />
        </Form.Item>

        <Form.Item name="phone" label="전화번호">
          <Input size="large" placeholder="010-0000-0000" />
        </Form.Item>

        <div className="flex gap-3">
          <Button size="large" block onClick={() => router.back()}>
            취소
          </Button>
          <Button type="primary" htmlType="submit" size="large" block loading={isPending} className="bg-green-700">
            저장
          </Button>
        </div>
      </Form>
    </main>
  );
}
