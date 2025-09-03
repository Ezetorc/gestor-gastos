import { Box, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {  useSearchFilterLogic } from '../hooks/useSearchFilterLogic';
import type { SelectOption, TransactionDateFilter, TransactionFilters, TransactionSelectFilter } from '../types/filter';

interface SearchFilterSubcomponentProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  onClearFilters: () => void;
}

export const Search_filterSubcomponent = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters
}: SearchFilterSubcomponentProps) => {
  const theme = useTheme();
  const {
    handleFilterChange,
    selectFilters,
    dateFilters,
    estilosBoxes,
    estilosSelect,
    gridSectionSx
  } = useSearchFilterLogic(filters, onFiltersChange);

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.paper, 
      borderRadius: 3, 
      p: 3,
      border: '1px solid #333'
    }}>
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar gastos/ingresos"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          sx={estilosBoxes}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.grey[500] }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={gridSectionSx} gap={2}>
        {selectFilters.map((filter: TransactionSelectFilter) => (
          <FormControl 
            key={filter.key} 
            variant="outlined" 
            sx={{ 
              ...estilosBoxes,
              minWidth: 180,
              flex: 1,
            }}
          >
            <InputLabel id={filter.labelId}>{filter.label}</InputLabel>
            <Select
              labelId={filter.labelId}
              value={filter.value}
              label={filter.label}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              sx={{
                '& .MuiSelect-icon': {
                  color: theme.palette.grey[500]
                },
              }}
              MenuProps={{ PaperProps: { sx: estilosSelect } }}
            >
              {filter.options.map((option: SelectOption) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value === '' ? <em>{option.label}</em> : option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
        
        {dateFilters.map((filter: TransactionDateFilter) => (
          <TextField
            key={filter.key}
            variant="outlined"
            label={filter.label}
            type="date"
            value={filter.value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              minWidth: 100,
              flex: 1,
              ...estilosBoxes,
            }}
          />
        ))}
        
        <Button
          variant="contained"
          onClick={onClearFilters}
          sx={{
            backgroundColor: '#9c27b0',
            borderRadius: 2,
            px: 3,
            py: 1.5,
            minWidth: 'auto',
            height: 'fit-content',
            flexShrink: 0,
            '&:hover': {
              backgroundColor: '#8e24aa',
            },
          }}
        >
          Limpiar Filtros
        </Button>
      </Box>
    </Box>
  );
};