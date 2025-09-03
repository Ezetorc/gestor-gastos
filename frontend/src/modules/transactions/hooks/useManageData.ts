import { useMemo } from 'react';
import transactions from '../mocks/transactions.mock.json';

export const useManageData = () => {
  const data = useMemo(() => {
    return transactions;
  }, []);

  return { data };
};