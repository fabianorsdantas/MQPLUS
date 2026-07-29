import type { Metadata } from 'next';
import React from 'react';
import '@mqplus/ui/src/styles/globals.css';
import { ThemeProvider } from '@mqplus/ui';

export const metadata: Metadata = {
  title: 'MQPLUS — Portal Administrativo Corporativo',
  description: 'Sistema Integrado de Gestão Pedagógica, Financeira e Operacional',
};

export default function AdminRootLayout({
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
