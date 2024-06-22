import { useState } from 'react';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Radio,
  InputLabel,
  RadioGroup,
  FormControl,
  CardActions,
  CardContent,
  OutlinedInput,
} from '@mui/material';

import Iconify from '../../components/iconify';

export default function CampaignCreateView() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* 콘텐츠 헤더 시작 */}
      <Stack mb={4}>
        <Box sx={{ display: 'flex' }} justifyContent="space-between" alignItems="center">
          <Typography variant="h4">캠페인 등록</Typography>

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
              subheader="캠페인 기본 정보를 입력해주세요"
              sx={{ mb: 3 }}
            />

            <Divider />

            <CardContent>
              <Stack p={1} spacing={2}>
                <Typography variant="subtitle2">키워드</Typography>
                <FormControl fullWidth variant="outlined" size="medium">
                  <InputLabel htmlFor="keyword">키워드</InputLabel>
                  <OutlinedInput id="keyword" label="키워드" />
                </FormControl>

                <Typography variant="subtitle2">업체명</Typography>
                <FormControl fullWidth variant="outlined" size="medium">
                  <InputLabel htmlFor="companyName">업체명</InputLabel>
                  <OutlinedInput id="companyName" label="업체명" />
                </FormControl>

                <Typography variant="subtitle2">URL</Typography>
                <FormControl fullWidth variant="outlined" size="medium">
                  <InputLabel htmlFor="campaignUrl">URL</InputLabel>
                  <OutlinedInput id="campaignUrl" label="URL" />
                </FormControl>

                <Typography variant="subtitle2">MID</Typography>
                <FormControl fullWidth variant="outlined" size="medium">
                  <InputLabel htmlFor="mid">MID</InputLabel>
                  <OutlinedInput id="mid" label="MID" />
                </FormControl>

                <Typography variant="subtitle2">기간</Typography>
                <Box display="flex">
                  <FormControl variant="outlined" size="medium" sx={{ flexGrow: 1, mr: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ko}>
                      <DatePicker
                        label="기간"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl variant="outlined" size="medium">
                    <OutlinedInput
                      id="durationDays"
                      type="number"
                      endAdornment={<InputAdornment position="end">일</InputAdornment>}
                    />
                  </FormControl>
                </Box>

                <Typography variant="subtitle2">리워드</Typography>
                <FormControl component="fieldset" fullWidth variant="outlined" size="medium">
                  <RadioGroup
                    aria-label="리워드"
                    name="reward"
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="placeTraffic"
                      control={<Radio />}
                      label="플레이스 트래픽"
                    />
                    <FormControlLabel
                      value="savePlace"
                      control={<Radio />}
                      label="플레이스 저장하기"
                    />
                    <FormControlLabel value="autoomplete" control={<Radio />} label="자동완성" />
                  </RadioGroup>
                </FormControl>

                <Typography variant="subtitle2">유입요청</Typography>
                <FormControl fullWidth variant="outlined" size="medium">
                  <InputLabel htmlFor="trafficRequest">유입요청</InputLabel>
                  <OutlinedInput id="trafficRequest" label="유입요청" />
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
