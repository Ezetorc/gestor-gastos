import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const Search_filterSubcomponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [select1, setSelect1] = useState('');
  const [select2, setSelect2] = useState('');
  const [select3, setSelect3] = useState('');

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box mt={2} display="flex" gap={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select1-label">Opción 1</InputLabel>
          <Select
            labelId="select1-label"
            value={select1}
            label="Opción 1"
            onChange={(e) => setSelect1(e.target.value)}
          >
            <MenuItem value={''}><em>None</em></MenuItem>
            <MenuItem value={'option1A'}>Option 1A</MenuItem>
            <MenuItem value={'option1B'}>Option 1B</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select2-label">Opción 2</InputLabel>
          <Select
            labelId="select2-label"
            value={select2}
            label="Opción 2"
            onChange={(e) => setSelect2(e.target.value)}
          >
            <MenuItem value={''}><em>None</em></MenuItem>
            <MenuItem value={'option2A'}>Option 2A</MenuItem>
            <MenuItem value={'option2B'}>Option 2B</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select3-label">Opción 3</InputLabel>
          <Select
            labelId="select3-label"
            value={select3}
            label="Opción 3"
            onChange={(e) => setSelect3(e.target.value)}
          >
            <MenuItem value={''}><em>None</em></MenuItem>
            <MenuItem value={'option3A'}>Option 3A</MenuItem>
            <MenuItem value={'option3B'}>Option 3B</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};