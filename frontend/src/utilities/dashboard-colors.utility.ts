import { theme } from '../constants/theme';

// Utilidad para colores del dashboard basados en valores numéricos
export const getDashboardColor = (value: number): string => {
  if (value === 0) return theme.colors.primary; // Celeste de la paleta MUI para 0
  if (value < 0) return 'error.main'; // Rojo para gastos usando el tema
  return 'success.main'; // Verde para ingresos usando el tema
};