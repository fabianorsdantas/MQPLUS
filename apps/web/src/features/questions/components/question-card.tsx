'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Badge } from '@mqplus/ui';

export interface Option {
  id: string;
  letter: string;
  content: string;
}

export interface QuestionProps {
  id: string;
  institution: string;
  examYear: number;
  difficulty: string;
  statement: string;
  options: Option[];
}

export function QuestionCard({ question }: { question: QuestionProps }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (optionId: string) => {
    if (!answered) {
      setSelectedOption(optionId);
    }
  };

  const handleConfirm = () => {
    if (selectedOption) {
      setAnswered(true);
    }
  };

  return (
    <Card className="w-full max-w-3xl shadow-lg border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50 mb-4">
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{question.institution} {question.examYear}</Badge>
          <Badge variant="tri">TRI: {question.difficulty}</Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
          💡 {showHint ? 'Ocultar Dica IA' : 'Pedir Dica à IA'}
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {showHint && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-foreground space-y-1">
            <p className="font-semibold text-primary">🤖 Tutor Socrático (IA):</p>
            <p className="text-muted-foreground">
              "Observe as relações de causa e efeito no enunciado antes de escolher. Qual lei da física governa esse fenômeno?"
            </p>
          </div>
        )}

        <div className="text-base leading-relaxed text-foreground font-sans">
          {question.statement}
        </div>

        <div className="space-y-3">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-start space-x-3 ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary'
                    : 'border-border bg-card hover:bg-muted/50'
                }`}
              >
                <span className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {opt.letter}
                </span>
                <span className="text-sm font-medium text-foreground pt-0.5">{opt.content}</span>
              </button>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t border-border/50 pt-4">
        <span className="text-xs text-muted-foreground">Questão ID: {question.id}</span>
        <Button
          onClick={handleConfirm}
          disabled={!selectedOption || answered}
          variant={answered ? 'outline' : 'default'}
        >
          {answered ? 'Resposta Confirmada' : 'Confirmar Resposta'}
        </Button>
      </CardFooter>
    </Card>
  );
}
