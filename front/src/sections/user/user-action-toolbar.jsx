import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import Iconify from '../../components/iconify';

export default function UserActionToolbar() {
  const navigate = useNavigate();

  return (
    <Toolbar
      sx={{
        height: 45,
        display: 'flex',
        justifyContent: 'end',
        bgcolor: 'background.paper',
        padding: (theme) => theme.spacing(0, 2),
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Iconify icon="mdi:file-excel-box" />}
          sx={{
            backgroundColor: '#217346',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1e5e37',
            },
          }}
        >
          엑셀 다운로드
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="eva:person-add-outline" />}
          onClick={() => navigate('/user/new')}
        >
          회원등록
        </Button>
      </Box>
    </Toolbar>
  );
}

UserActionToolbar.propTypes = {};
