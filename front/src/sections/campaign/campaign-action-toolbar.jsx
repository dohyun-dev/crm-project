import * as propsType from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme, useMediaQuery } from '@mui/material';

import Iconify from '../../components/iconify';

export default function CampaignActionToolbar({
  onClickApprove,
  onClickShutdown,
  onClickExtend,
  onClickExcelDownload,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Toolbar
      sx={{
        height: 45,
        display: 'flex',
        justifyContent: isSmallScreen ? 'center' : 'space-between',
        bgcolor: 'background.paper',
        padding: (th) => th.spacing(0, 2),
        boxShadow: 1,
      }}
    >
      <Box
        display="flex"
        sx={{
          gap: isSmallScreen ? 0 : 1,
        }}
      >
        <Button
          variant="contained"
          startIcon={!isSmallScreen && <Iconify icon="mdi:check-circle" />}
          sx={{
            backgroundColor: 'success.main',
            color: 'success.contrastText',
            '&:hover': {
              backgroundColor: 'success.dark',
            },
            whiteSpace: 'nowrap',
          }}
          onClick={onClickApprove}
        >
          승인완료
        </Button>
        <Button
          variant="contained"
          startIcon={!isSmallScreen && <Iconify icon="mdi:close-circle" />}
          sx={{
            backgroundColor: 'error.main',
            color: 'error.contrastText',
            '&:hover': {
              backgroundColor: 'error.dark',
            },
            whiteSpace: 'nowrap',
          }}
          onClick={onClickShutdown}
        >
          강제종료
        </Button>
      </Box>

      <Box
        display="flex"
        sx={{
          gap: isSmallScreen ? 0 : 1,
        }}
      >
        <Button
          variant="contained"
          startIcon={!isSmallScreen && <Iconify icon="mdi:wrench" />}
          sx={{
            backgroundColor: '#0052cc',
            color: 'white',
            '&:hover': {
              backgroundColor: '#003d99',
            },
            whiteSpace: 'nowrap',
          }}
          onClick={onClickExtend}
        >
          연장하기
        </Button>
        <Button
          variant="contained"
          startIcon={!isSmallScreen && <Iconify icon="mdi:file-excel-box" />}
          sx={{
            backgroundColor: '#217346',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1e5e37',
            },
            whiteSpace: 'nowrap',
          }}
          onClick={onClickExcelDownload}
        >
          엑셀 다운로드
        </Button>
      </Box>
    </Toolbar>
  );
}

CampaignActionToolbar.propTypes = {
  onClickApprove: propsType.func,
  onClickShutdown: propsType.func,
  onClickExtend: propsType.func,
  onClickExcelDownload: propsType.func,
};
