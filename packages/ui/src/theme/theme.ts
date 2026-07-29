import { tokens } from '../tokens/tokens';

export const theme = {
  ...tokens,
  animation: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    medium: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

export type Theme = typeof theme;
