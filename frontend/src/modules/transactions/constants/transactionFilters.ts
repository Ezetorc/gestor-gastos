import type { TransactionFilters } from '../types/transaction';
import { useMemo } from 'react';
import { useManageData } from '../hooks/manage_data';

export const INITIAL_TRANSACTION_FILTERS: TransactionFilters = {
  search: '',
  category: '',
  payment_method: '',
  type: 'all',
  date_from: '',
  date_to: '',
};

export const useAvailableFilters = () => {
  const { data } = useManageData();

  const { categories, paymentMethods } = useMemo(() => {
    const categoriesSet = new Set<string>();
    const paymentMethodsSet = new Set<string>();

    data.forEach((transaction: any) => {
      if (transaction.category) categoriesSet.add(transaction.category);
      if (transaction.payment_method) paymentMethodsSet.add(transaction.payment_method);
    });

    return {
      categories: Array.from(categoriesSet),
      paymentMethods: Array.from(paymentMethodsSet),
    };
  }, [data]);

  return { categories, paymentMethods };
};