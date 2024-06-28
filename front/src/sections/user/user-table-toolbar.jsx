import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Select } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({
  filterType,
  onFilterTypeChange,
  filterValue,
  onFilterValueChange,
}) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Select
          value={filterType}
          onChange={onFilterTypeChange}
          displayEmpty
          renderValue={(selected) => {
            if (selected === '') {
              return <em>전체</em>;
            }
            switch (selected) {
              case 'companyName':
                return '이름';
              default:
                return '전체';
            }
          }}
          sx={{ marginRight: 1 }}
        >
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>
          <MenuItem value="companyName">이름</MenuItem>
        </Select>
        <OutlinedInput
          value={filterValue}
          onChange={onFilterValueChange}
          placeholder="검색하기"
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      </Box>
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  filterValue: PropTypes.string,
  onFilterValueChange: PropTypes.func,
  filterType: PropTypes.string,
  onFilterTypeChange: PropTypes.func,
};
