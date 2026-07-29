import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@mqplus/ui';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 space-y-6">
      <Badge variant="tri" className="text-sm px-3 py-1">
        MQPLUS v1.0.0 — Stack de Arquitetura Inicial
      </Badge>

      <h1 className="text-4xl font-extrabold tracking-tight text-foreground text-center">
        Ecossistema Educacional Inteligente
      </h1>

      <p className="text-muted-foreground max-w-xl text-center text-lg">
        Preparação de alta performance para ENEM, Vestibulares, IFs, ETECs e Olimpíadas com IA Socrática e Teoria de Resposta ao Item.
      </p>

      <Card className="w-full max-w-md border-primary/20">
        <CardHeader>
          <CardTitle>Status da Arquitetura</CardTitle>
          <CardDescription>Estrutura Monorepo Modular NestJS + Next.js</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-muted rounded-md text-xs font-mono text-muted-foreground">
            Backend API: http://localhost:4000/api/v1<br/>
            Swagger Docs: http://localhost:4000/api/docs
          </div>
          <Button variant="default" className="w-full">
            Acessar Plataforma do Estudante
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
