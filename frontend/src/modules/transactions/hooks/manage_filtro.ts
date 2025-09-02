import { useEffect, useState } from 'react';
import { INITIAL_TRANSACTION_FILTERS } from '../constants/transactionFilters';
import { normalizeText } from '../utils/normalizeText';
import type { Transaction, TransactionFilters } from '../types/transaction';

export const useTransactionFilters = (transactions: Transaction[]) => {
  // Estado para los filtros aplicados
  const [filters, setFilters] = useState<TransactionFilters>(INITIAL_TRANSACTION_FILTERS);
  
  // Estado para las transacciones filtradas
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  // Efecto que se ejecuta cuando cambian los filtros o las transacciones
  useEffect(() => {
    // Aplicar todos los filtros a las transacciones
    let result = transactions.filter((transaction) => {
      // Filtro por búsqueda: busca en descripción y categoría (sin distinción de mayúsculas/minúsculas)
      const matchesSearch = !filters.search || 
        normalizeText(transaction.description).includes(normalizeText(filters.search)) ||
        normalizeText(transaction.category).includes(normalizeText(filters.search));

      // Filtro por categoría específica
      const matchesCategory = !filters.category || transaction.category === filters.category;

      // Filtro por método de pago (efectivo, tarjeta, etc.)
      const matchesPaymentMethod = !filters.payment_method || 
        transaction.payment_method === filters.payment_method;

      // Filtro por tipo de transacción (ingreso, gasto o todos)
      const matchesType = filters.type === 'all' || transaction.type === filters.type;

      // Filtro por fecha desde (inicio del rango)
      const matchesDateFrom = !filters.date_from || 
        new Date(transaction.date) >= new Date(filters.date_from);
      
      // Filtro por fecha hasta (fin del rango)
      const matchesDateTo = !filters.date_to || 
        new Date(transaction.date) <= new Date(filters.date_to);

      // La transacción pasa el filtro si cumple TODAS las condiciones
      return matchesSearch && matchesCategory && matchesPaymentMethod && 
             matchesType && matchesDateFrom && matchesDateTo;
    });

    // Ordenar por fecha (más recientes primero)
    result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Actualizar el estado con las transacciones filtradas
    setFilteredTransactions(result);
  }, [filters, transactions]);

  const clearFilters = () => {
    setFilters(INITIAL_TRANSACTION_FILTERS);
  };

  return {
    filters,                    // Filtros actuales
    setFilters,                // Función para actualizar filtros
    filteredTransactions,      // Todas las transacciones filtradas
    clearFilters,              // Función para limpiar filtros
  };
};