export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFilter<T> {
  key: keyof T;
  label: string;
  labelId: string;
  value: T[keyof T];
  options: SelectOption[];
}

export type TransactionSelectFilter = SelectFilter<TransactionFilters>;

export interface TransactionFilters {
  search: string;
  category: string;
  payment_method: string;
  type: 'all' | 'income' | 'expense';
  date_from?: string;
  date_to?: string;
}

export interface DateFilter<T> {
  key: keyof T;
  label: string;
  value: string; 
}
export type TransactionDateFilter = DateFilter<TransactionFilters>;