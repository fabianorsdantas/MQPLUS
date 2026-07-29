import React from 'react';
import { LoginForm } from '@/features/auth/components/login-form';

export const metadata = {
  title: 'Login — MQPLUS',
  description: 'Acesse seu plano de estudos adaptativo na plataforma MQPLUS',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <LoginForm />
    </div>
  );
}
