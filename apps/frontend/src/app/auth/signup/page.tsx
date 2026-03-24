'use client';

import { useRouter } from 'next/navigation';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useEmailSignUp } from '@/hooks/mutations/useEmailSignUp';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const { mutateAsync: emailSignUp, isPending } = useEmailSignUp();

  const onFinish = async (values: SignUpForm) => {
    try {
      await emailSignUp({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
      });
      message.success('회원가입이 완료되었습니다!');
      router.push('/');
    } catch (error: any) {
      message.error(error?.response?.data?.message ?? '회원가입에 실패했습니다.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-green-700">회원가입</h1>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="이름"
            rules={[{ required: true, message: '이름을 입력해주세요.' }]}
          >
            <Input size="large" placeholder="이름을 입력하세요" />
          </Form.Item>

          <Form.Item
            name="email"
            label="이메일"
            rules={[{ required: true, type: 'email', message: '올바른 이메일을 입력해주세요.' }]}
          >
            <Input size="large" placeholder="이메일을 입력하세요" />
          </Form.Item>

          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              { required: true, message: '비밀번호를 입력해주세요.' },
              { min: 8, message: '비밀번호는 8자 이상이어야 합니다.' },
            ]}
          >
            <Input.Password size="large" placeholder="8자 이상 입력하세요" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="비밀번호 확인"
            dependencies={['password']}
            rules={[
              { required: true, message: '비밀번호를 한 번 더 입력해주세요.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve();
                  return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="비밀번호를 다시 입력하세요" />
          </Form.Item>

          <Form.Item name="phone" label="전화번호 (선택)">
            <Input size="large" placeholder="010-0000-0000" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isPending}
            className="bg-green-700 hover:bg-green-800"
          >
            회원가입
          </Button>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{' '}
          <Link href="/auth/login" className="font-medium text-green-700 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
