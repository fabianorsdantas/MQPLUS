'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Badge } from '@mqplus/ui';

export interface Column<T> {
  header: string;
  accessorKey: keyof T | ((row: T) => React.ReactNode);
}

export interface DataTableProps<T> {
  title: string;
  description?: string;
  columns: Column<T>[];
  data: T[];
  onAdd?: () => void;
  searchPlaceholder?: string;
}

export function DataTable<T extends { id: string }>({
  title,
  description,
  columns,
  data,
  onAdd,
  searchPlaceholder = 'Buscar registros...',
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full shadow-lg border-border">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        {onAdd && (
          <Button onClick={onAdd} size="sm">
            + Cadastrar Novo
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="p-4 border-b border-border bg-muted/20">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs border-b border-border font-semibold">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="px-6 py-3">
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                    {columns.map((col, cIndex) => (
                      <td key={cIndex} className="px-6 py-4 font-medium text-foreground">
                        {typeof col.accessorKey === 'function'
                          ? col.accessorKey(row)
                          : String(row[col.accessorKey] ?? '')}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm">
                        ✏️ Editar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-muted-foreground">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
