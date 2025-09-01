import { useMemo } from 'react';
import expenses from '../mocks/expenses.mock.json';
import incomes from '../mocks/incomes.mock.json';

// Hook para gestionar la importación y combinación de datos desde los mocks
export const useManageData = () => {
  // Utilizamos useMemo para evitar recalculaciones innecesarias
  const combinedData = useMemo(() => {
    return [...expenses, ...incomes];
  }, []);

  return { data: combinedData };
};
