import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Button, Badge } from '@mqplus/ui';

export const metadata = {
  title: 'Login Administrador — MQPLUS Portal Admin',
  description: 'Acesso Restrito ao Portal Administrativo MQPLUS',
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/30">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Badge variant="tri">MQPLUS — Portal Admin</Badge>
          </div>
          <CardTitle className="text-2xl font-bold">Acesso Restrito</CardTitle>
          <CardDescription>
            Identifique-se com suas credenciais corporativas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">E-mail Operacional</label>
            <Input type="email" defaultValue="admin@mqplus.com.br" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha</label>
            <Input type="password" defaultValue="••••••••" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Entrar no Portal Admin
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
