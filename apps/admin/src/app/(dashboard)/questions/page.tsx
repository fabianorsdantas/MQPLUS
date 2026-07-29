'use client';

import React from 'react';
import { DataTable, Column } from '@/components/common/data-table';
import { Badge } from '@mqplus/ui';

interface QuestionRow {
  id: string;
  institution: string;
  discipline: string;
  difficulty: string;
  examYear: number;
  status: string;
}

const dummyQuestions: QuestionRow[] = [
  { id: 'q_01', institution: 'INEP / ENEM', discipline: 'Física', difficulty: 'Médio (b: 0.45)', examYear: 2024, status: 'PUBLICADO' },
  { id: 'q_02', institution: 'FUVEST', discipline: 'Matemática', difficulty: 'Difícil (b: 1.20)', examYear: 2024, status: 'REVISÃO' },
  { id: 'q_03', institution: 'UNICAMP', discipline: 'Química', difficulty: 'Fácil (b: -0.80)', examYear: 2023, status: 'PUBLICADO' },
  { id: 'q_04', institution: 'IFSP / ETEC', discipline: 'Português', difficulty: 'Médio (b: 0.10)', examYear: 2023, status: 'RASCUNHO' },
];

export default function AdminQuestionsPage() {
  const columns: Column<QuestionRow>[] = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Banca / Exame', accessorKey: (row) => `${row.institution} (${row.examYear})` },
    { header: 'Disciplina', accessorKey: 'discipline' },
    { header: 'Parâmetro TRI', accessorKey: 'difficulty' },
    {
      header: 'Status',
      accessorKey: (row) => (
        <Badge
          variant={row.status === 'PUBLICADO' ? 'success' : row.status === 'REVISÃO' ? 'secondary' : 'outline'}
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <DataTable
        title="CMS de Banco de Questões"
        description="Gestão de itens pedagógicos, homologação TRI e categorização por Matriz BNCC"
        columns={columns}
        data={dummyQuestions}
        onAdd={() => alert('Abrir modal de cadastro de questão')}
        searchPlaceholder="Filtrar por banca, disciplina ou ID..."
      />
    </div>
  );
}
