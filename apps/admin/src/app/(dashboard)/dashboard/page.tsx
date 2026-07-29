'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '@mqplus/ui';

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <Badge variant="tri" className="mb-1">Visão Geral Corporativa</Badge>
          <h1 className="text-3xl font-extrabold text-foreground">Dashboard Executivo</h1>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">📥 Exportar Relatório</Button>
          <Button size="sm">+ Nova Questão (CMS)</Button>
        </div>
      </div>

      {/* KPIs Financeiros e Operacionais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Receita Recorrente (MRR)</CardDescription>
            <CardTitle className="text-2xl font-bold text-emerald-500">R$ 142.800</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ +14% neste mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Usuários Ativos (MAU)</CardDescription>
            <CardTitle className="text-2xl font-bold text-primary">34.290</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Estudantes cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Fila de Revisão Pedagógica</CardDescription>
            <CardTitle className="text-2xl font-bold text-amber-500">5 Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Aguardando homologação TRI</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Resoluções TRI / 24h</CardDescription>
            <CardTitle className="text-2xl font-bold text-foreground">189.400</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">SLA DB: 99.9% Uptime</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Pendências de Moderação */}
      <Card>
        <CardHeader>
          <CardTitle>Pendências de Homologação Pedagógica</CardTitle>
          <CardDescription>Questões inseridas por Conteudistas aguardando aprovação do Revisor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div>
                <p className="font-semibold text-sm">Física — Circuito de Resistores (ENEM 2024)</p>
                <p className="text-xs text-muted-foreground">Autor: Prof. Carlos Silva | Parâmetro TRI b: 0.45</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Revisar Item</Button>
                <Button size="sm">Aprovar & Publicar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
