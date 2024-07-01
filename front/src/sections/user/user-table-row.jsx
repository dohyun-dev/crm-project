import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  name,
  username,
  businessRegistrationNumber,
  email,
  phone,
  accountHolder,
  createdAt,
  updatedAt,
  onClick,
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        sx={{ textAlign: 'center' }}
        selected={selected}
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onClick} />
        </TableCell>

        <TableCell align="center">{id}</TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{username}</TableCell>
        <TableCell align="center">{businessRegistrationNumber}</TableCell>
        <TableCell align="center">{email}</TableCell>
        <TableCell align="center">{phone}</TableCell>
        <TableCell align="center">{accountHolder}</TableCell>
        <TableCell align="center">{new Date(createdAt).toLocaleDateString()}</TableCell>
        <TableCell align="center">{new Date(updatedAt).toLocaleDateString()}</TableCell>
        <TableCell align="center">
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
        <MenuItem onClick={() => navigate(`/user/edit/${id}`)}>
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
  name: PropTypes.string,
  username: PropTypes.string,
  businessRegistrationNumber: PropTypes.any,
  email: PropTypes.string,
  phone: PropTypes.string,
  accountHolder: PropTypes.string,
  createdAt: PropTypes.any,
  updatedAt: PropTypes.any,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
