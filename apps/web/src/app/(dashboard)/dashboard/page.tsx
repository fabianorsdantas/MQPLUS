'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '@mqplus/ui';
import { useAuthStore } from '@/store/use-auth-store';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background p-6 max-w-7xl mx-auto space-y-8">
      {/* Header do Estudante */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
        <div>
          <Badge variant="tri" className="mb-2">ENEM 2024 — Meta Medicina</Badge>
          <h1 className="text-3xl font-extrabold text-foreground">
            Olá, {user?.fullName || 'Estudante MQPLUS'}! 👋
          </h1>
          <p className="text-muted-foreground text-sm">
            Aqui está o seu plano de estudos adaptativo para hoje.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-muted/50 p-3 rounded-xl border border-border">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Sequência de Estudos</p>
            <p className="text-lg font-bold text-foreground">7 Dias Seguidos (Streak)</p>
          </div>
        </div>
      </div>

      {/* Grid de KPIs & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription>Nota Estimada TRI</CardDescription>
            <CardTitle className="text-3xl font-bold text-primary">742.5 pts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              ↑ +28.4 pts em relação ao simulado anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revisões Espaçadas (SRS)</CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">15 Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Agendados para hoje em Eletrodinâmica e Genética
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Saúde Mental & Foco</CardDescription>
            <CardTitle className="text-3xl font-bold text-emerald-500">Equilibrado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Última pausa recomendada realizada com sucesso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tarefas Diárias de Estudo Ativo */}
      <Card>
        <CardHeader>
          <CardTitle>Plano Adaptativo de Hoje</CardTitle>
          <CardDescription>Metas recomendadas pelo algoritmo para combater a curva de esquecimento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <span className="text-xl">⚡</span>
              <div>
                <p className="font-semibold text-sm text-foreground">10 Questões de Física (Eletrodinâmica)</p>
                <p className="text-xs text-muted-foreground">Foco nas lacunas de resistores em paralelo</p>
              </div>
            </div>
            <Button size="sm">Iniciar Lista</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🧠</span>
              <div>
                <p className="font-semibold text-sm text-foreground">Revisão de 15 Flashcards SRS</p>
                <p className="text-xs text-muted-foreground">Biologia Celular e Leis de Mendel</p>
              </div>
            </div>
            <Button size="sm" variant="outline">Revisar Agora</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
