import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

const getLabelStyle = (state) => {
  switch (state) {
    case '승인요청':
      return {
        backgroundColor: 'grey.500', // 노란색 (warning)
        color: 'grey.0',
      };
    case '진행중':
      return {
        backgroundColor: 'success.main', // 초록색 (success)
        color: 'success.contrastText',
      };
    default:
      return {
        backgroundColor: 'error.main', // 빨간색 (error)
        color: 'error.contrastText',
      };
  }
};

// ----------------------------------------------------------------------

export default function CampaignTableRow({
  selected,
  id,
  state,
  memberName,
  rewardType,
  keyword,
  companyName,
  url,
  mid,
  trafficRequest,
  trafficRequestTotal,
  period,
  startDate,
  endDate,
  onClick,
  onClickDelete,
  isAdmin,
  isAutocomplete,
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  console.log(state);

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
        <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
          <Box
            sx={{
              ...getLabelStyle(state),
              width: '5rem',
              py: 0.5,
              px: 1,
              borderRadius: 2,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {state}
          </Box>
        </TableCell>
        <TableCell>{memberName}</TableCell>
        <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{rewardType}</TableCell>
        <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{keyword}</TableCell>
        {!isAutocomplete && (
          <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{companyName}</TableCell>
        )}
        {!isAutocomplete && (
          <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{url}</TableCell>
        )}
        {!isAutocomplete && (
          <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{mid}</TableCell>
        )}
        <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{trafficRequest}</TableCell>
        <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
          {trafficRequestTotal}
        </TableCell>
        <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{period}</TableCell>
        <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{startDate}</TableCell>
        <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{endDate}</TableCell>
        <TableCell align="right">
          {isAdmin && (
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
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
        <MenuItem onClick={() => navigate(`/campaign/edit/${id}`)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          수정
        </MenuItem>

        <MenuItem onClick={onClickDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          삭제
        </MenuItem>
      </Popover>
    </>
  );
}

CampaignTableRow.propTypes = {
  selected: PropTypes.bool,
  id: PropTypes.any,
  state: PropTypes.string,
  memberName: PropTypes.string,
  rewardType: PropTypes.string,
  keyword: PropTypes.string,
  companyName: PropTypes.string,
  url: PropTypes.string,
  mid: PropTypes.any,
  trafficRequest: PropTypes.any,
  trafficRequestTotal: PropTypes.number,
  period: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onClick: PropTypes.func,
  onClickDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  isAutocomplete: PropTypes.bool,
};
