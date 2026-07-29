import type { Metadata } from 'next';
import React from 'react';
import '@mqplus/ui/src/styles/globals.css';
import { ThemeProvider } from '@mqplus/ui';

export const metadata: Metadata = {
  title: 'MQPLUS — Ecossistema Educacional Inteligente',
  description: 'Plataforma de alta performance para ENEM, Vestibulares, IFs, ETECs e Olimpíadas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
