'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@mqplus/ui';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard Executivo', href: '/dashboard', icon: '📊' },
  { label: 'Banco de Questões (CMS)', href: '/questions', icon: '📝', badge: '5 Pendentes' },
  { label: 'Gestão de Usuários (RBAC)', href: '/users', icon: '👥' },
  { label: 'Simulados & Matriz TRI', href: '/simulations', icon: '📑' },
  { label: 'B2B Escolas & Turmas', href: '/schools', icon: '🏫' },
  { label: 'Auditoria & Logs', href: '/audit', icon: '🛡️' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center space-x-2 px-2">
          <Badge variant="tri" className="text-xs">MQPLUS Portal Admin</Badge>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-muted/40 rounded-xl border border-border text-xs space-y-1">
        <p className="font-semibold text-foreground">Sessão Operacional</p>
        <p className="text-muted-foreground">Operador: Admin Geral</p>
        <p className="text-muted-foreground">Status: Conectado (SSL/TLS 1.3)</p>
      </div>
    </aside>
  );
}
