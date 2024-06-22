import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  company,
  username,
  businessRegistrationNumber,
  email,
  phone,
  accountHolder,
  createdAt,
  updatedAt,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{id}</TableCell>
        <TableCell>{company}</TableCell>
        <TableCell>{username}</TableCell>
        <TableCell>{businessRegistrationNumber}</TableCell>
        <TableCell align="center">{email}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{accountHolder}</TableCell>
        <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(updatedAt).toLocaleDateString()}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          수정
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          삭제
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  company: PropTypes.string,
  username: PropTypes.string,
  businessRegistrationNumber: PropTypes.any,
  email: PropTypes.string,
  phone: PropTypes.string,
  accountHolder: PropTypes.string,
  createdAt: PropTypes.any,
  updatedAt: PropTypes.any,
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
};
