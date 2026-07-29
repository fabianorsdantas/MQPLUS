'use client';

import React from 'react';
import { QuestionCard } from '@/features/questions/components/question-card';
import { Badge } from '@mqplus/ui';

const dummyQuestion = {
  id: 'q_enem_2024_01',
  institution: 'INEP / ENEM',
  examYear: 2024,
  difficulty: 'Médio (TRI b: 0.45)',
  statement:
    'Um circuito elétrico residencial é composto por três resistores idênticos conectados em paralelo a uma fonte de tensão constante de 110 V. Se um dos resistores for desconectado do circuito, o que acontece com a corrente elétrica total fornecida pela fonte e com a ddp sobre os resistores remanescentes?',
  options: [
    { id: 'opt_1', letter: 'A', content: 'A corrente total diminui e a ddp sobre os resistores remanescentes permanece constante.' },
    { id: 'opt_2', letter: 'B', content: 'A corrente total aumenta e a ddp sobre os resistores remanescentes diminui.' },
    { id: 'opt_3', letter: 'C', content: 'A corrente total permanece constante e a ddp aumenta.' },
    { id: 'opt_4', letter: 'D', content: 'Tanto a corrente total quanto a ddp diminuem pela metade.' },
    { id: 'opt_5', letter: 'E', content: 'A corrente total e a ddp permanecem inalteradas.' },
  ],
};

export default function QuestionsPage() {
  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center space-y-6 max-w-5xl mx-auto">
      <div className="w-full text-left space-y-2">
        <Badge variant="secondary">Banco de Questões Adaptativo</Badge>
        <h1 className="text-3xl font-extrabold text-foreground">Física — Eletrodinâmica</h1>
        <p className="text-sm text-muted-foreground">
          Resolução ativa com suporte do Tutor de IA Socrático
        </p>
      </div>

      <QuestionCard question={dummyQuestion} />
    </div>
  );
}
