import {
  Box,
  Typography,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { TrasContainerSx, TrasCardSx } from './Tras.styles';
import { Search_filterSubcomponent } from './Search_filterSubcomponent';
import { TrasSubcomponet } from './TrasSubcomponet';

const TransactionComponent = () => {
  return (
    <Box sx={TrasContainerSx}>
      <Box display="flex" alignItems="center" gap={1}>
        <FilterAltOutlinedIcon sx={{ fontSize: '2.5em' }} />
        <Typography variant="h4">Transacciones Filtrados:</Typography>
      </Box>
      <Box sx={TrasCardSx}>
        <Search_filterSubcomponent />
      </Box>
      <Box sx={TrasCardSx}>
        <TrasSubcomponet />
      </Box>
    </Box>
  );
};
export default TransactionComponent;
