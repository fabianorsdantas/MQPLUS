export const colors = {
  brand: {
    primary: '#4F46E5', // Electric Indigo
    primaryHover: '#4338CA',
    secondary: '#7C3AED', // Cyber Purple
    secondaryHover: '#6D28D9',
    accent: '#10B981', // Emerald Mint
  },
  semantic: {
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    info: '#2563EB',
  },
  neutral: {
    slate50: '#F8FAFC',
    slate100: '#F1F5F9',
    slate200: '#E2E8F0',
    slate400: '#94A3B8',
    slate600: '#475569',
    slate800: '#1E293B',
    slate900: '#0F172A',
    darkBg: '#090D16',
    darkCard: '#111827',
  },
} as const;

export type ColorToken = typeof colors;
