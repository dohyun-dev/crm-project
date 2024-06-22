import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { InputLabel, FormControl, CardActions, CardContent, OutlinedInput } from '@mui/material';

import Iconify from '../../components/iconify';

export default function UserCreateView() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* 콘텐츠 헤더 시작 */}
      <Stack mb={4}>
        <Box sx={{ display: 'flex' }} justifyContent="space-between" alignItems="center">
          <Typography variant="h4">회원생성</Typography>

          <Button
            variant="contained"
            color="info"
            startIcon={<Iconify icon="eva:arrow-back-outline" />}
            onClick={() => navigate(-1)}
          >
            돌아가기
          </Button>
        </Box>
      </Stack>
      {/* 콘텐츠 헤더 끝 */}

      <form noValidate autoComplete="off">
        <Stack spacing={2}>
          <Card sx={{ p: 1 }}>
            <CardHeader
              title={<Typography variant="h6">기본정보</Typography>}
              subheader="회원 기본 정보를 입력해주세요"
              sx={{ mb: 3 }}
            />

            <Divider />

            <CardContent>
              <Stack p={1} spacing={2}>
                <Typography variant="subtitle2">업체명</Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="company">업체명</InputLabel>
                  <OutlinedInput id="company" label="업체명" />
                </FormControl>

                <Typography variant="subtitle2">아이디</Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="username">아이디</InputLabel>
                  <OutlinedInput id="username" label="아이디" />
                </FormControl>

                <Typography variant="subtitle2">비밀번호</Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="password">비밀번호</InputLabel>
                  <OutlinedInput id="password" label="비밀번호" />
                </FormControl>

                <Typography variant="subtitle2">사업자등록번호</Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="businessRegistrationNumber">사업자등록번호</InputLabel>
                  <OutlinedInput id="businessRegistrationNumber" label="사업자등록번호" />
                </FormControl>

                <Typography variant="subtitle2">이메일</Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="email">이메일</InputLabel>
                  <OutlinedInput id="email" label="이메일" />
                </FormControl>

                <Typography variant="subtitle2">연락처</Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="contact">연락처</InputLabel>
                  <OutlinedInput id="contact" label="연락처" />
                </FormControl>

                <Typography variant="subtitle2">예금주</Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="accountHolder">예금주</InputLabel>
                  <OutlinedInput id="accountHolder" label="예금주" />
                </FormControl>
              </Stack>
            </CardContent>

            <Divider />

            <CardActions sx={{ py: 3, px: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Iconify icon="eva:checkmark-circle-2-outline" />}
                fullWidth
                sx={{ py: 1 }}
              >
                등록하기
              </Button>
            </CardActions>
          </Card>
        </Stack>
      </form>
    </Container>
  );
}
