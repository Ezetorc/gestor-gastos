import { useEffect, useState } from 'react';
import { INITIAL_FILTERS } from '@/constants/Filter';
import { MATERIAS_SISTEMAS } from '@/data/materias';
import { normalizeText } from '@/utils/normalizeText';
import type { Filter } from '@/types/filter';

const PAGE_SIZE = 9;

export const useSubjects = () => {
  const [filters, setFilters] = useState<Filter>(INITIAL_FILTERS);
  const [filteredSubjects, setFilteredSubjects] = useState<typeof MATERIAS_SISTEMAS>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      const result = MATERIAS_SISTEMAS.filter((s) =>
        normalizeText(s.title).includes(normalizeText(filters.search))
      )
        .filter((s) => (filters.year === 0 ? true : s.year === filters.year))
        .filter((s) => (filters.quadmester === 0 ? true : s.quadmester === filters.quadmester))
        .sort((a, b) => a.title.localeCompare(b.title));

      setFilteredSubjects(result);
      setVisibleCount(PAGE_SIZE); // Reset visible count al cambiar filtros
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  const visibleSubjects = filteredSubjects.slice(0, visibleCount);

  const showMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const hasMore = visibleCount < filteredSubjects.length;

  return {
    filters,
    setFilters,
    filteredSubjects: visibleSubjects,
    loading,
    showMore,
    hasMore,
  };
};