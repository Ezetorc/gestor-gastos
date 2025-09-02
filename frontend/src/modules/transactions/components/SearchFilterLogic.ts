import { useAvailableFilters } from '../constants/transactionFilters';
import type { TransactionFilters } from '../types/transaction';

export const SearchFilterLogic = (
  filters: TransactionFilters,
  onFiltersChange: (filters: TransactionFilters) => void
) => {
  const { categories, paymentMethods } = useAvailableFilters();

  const handleFilterChange = (key: keyof TransactionFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const selectFilters = [
    {
      key: 'category' as keyof TransactionFilters,
      label: 'Categoría',
      labelId: 'category-label',
      value: filters.category,
      options: [
        { value: '', label: 'Todas las categorías' },
        ...categories.map((category: string) => ({ value: category, label: category }))
      ]
    },
    {
      key: 'payment_method' as keyof TransactionFilters,
      label: 'Método de Pago',
      labelId: 'payment-method-label',
      value: filters.payment_method,
      options: [
        { value: '', label: 'Todos los métodos' },
        ...paymentMethods.map((method: string) => ({ value: method, label: method }))
      ]
    },
    {
      key: 'type' as keyof TransactionFilters,
      label: 'Tipo',
      labelId: 'type-label',
      value: filters.type,
      options: [
        { value: 'all', label: 'Todos' },
        { value: 'income', label: 'Ingresos' },
        { value: 'expense', label: 'Gastos' }
      ]
    }
  ];

  const dateFilters = [
    {
      key: 'date_from' as keyof TransactionFilters,
      label: 'Fecha desde',
      value: filters.date_from || ''
    },
    {
      key: 'date_to' as keyof TransactionFilters,
      label: 'Fecha hasta',
      value: filters.date_to || ''
    }
  ];

  const estilosBoxes = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#2d2d2d',
      borderRadius: 2,
      '& fieldset': {
        borderColor: '#444',
      },
      '&:hover fieldset': {
        borderColor: '#666',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9c27b0',
      },
    },
    '& .MuiInputBase-input': {
      color: '#fff',
      '&::placeholder': {
        color: '#aaa',
        opacity: 1,
      },
    },
    '& .MuiInputLabel-root': {
      color: '#aaa',
      '&.Mui-focused': {
        color: '#9c27b0',
      },
    },
  };

  const estilosSelect = {
    backgroundColor: '#2d2d2d',
    '& .MuiMenuItem-root': {
      color: '#fff',
      '&:hover': {
        backgroundColor: '#444',
      },
      '&.Mui-selected': {
        backgroundColor: '#9c27b0',
        '&:hover': {
          backgroundColor: '#8e24aa',
        },
      },
    }
  };

  return {
    handleFilterChange,
    selectFilters,
    dateFilters,
    estilosBoxes,
    estilosSelect
  };
};