import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import Iconify from '../../components/iconify';

export default function CampaignActionToolbar({ onClickExtend }) {
  return (
    <Toolbar
      sx={{
        height: 45,
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        padding: (theme) => theme.spacing(0, 2),
        boxShadow: 1,
      }}
    >
      <Box display="flex" gap={1}>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mdi:check-circle" />}
          sx={{
            backgroundColor: 'success.main', // 팔레트에서 success.main 색상 사용
            color: 'success.contrastText', // 팔레트에서 대비 텍스트 색상 사용
            '&:hover': {
              backgroundColor: 'success.dark', // 팔레트에서 success.dark 색상 사용
            },
          }}
        >
          승인완료
        </Button>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mdi:close-circle" />}
          sx={{
            backgroundColor: 'error.main',
            color: 'error.contrastText',
            '&:hover': {
              backgroundColor: 'error.dark',
            },
          }}
        >
          강제종료
        </Button>
      </Box>

      <Box display="flex" gap={1}>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mdi:wrench" />}
          sx={{
            backgroundColor: '#0052cc',
            color: 'white',
            '&:hover': {
              backgroundColor: '#003d99',
            },
          }}
          onClick={onClickExtend}
        >
          연장하기
        </Button>
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
      </Box>
    </Toolbar>
  );
}

CampaignActionToolbar.propTypes = {};
