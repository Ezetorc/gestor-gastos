// Utilidad para colores del dashboard basados en valores numéricos
export const getDashboardColor = (value: number): string => {
  if (value === 0) return '#4FC3F7'; // Celeste para 0
  if (value < 0) return '#F44336'; // Rojo para gastos
  return '#4CAF50'; // Verde para ingresos
};