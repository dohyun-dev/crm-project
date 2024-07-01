import dayjs from 'dayjs';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Radio,
  Tooltip,
  RadioGroup,
  FormControl,
  CardActions,
  CardContent,
  FormHelperText,
} from '@mui/material';

import API from '../../apis/api';
import Iconify from '../../components/iconify';

const STRING_MAX_LENGTH = 1024;
const NUMBER_CHECK_PATTERN = /^[0-9]+$/;

const getMinDate = () => {
  const now = dayjs();
  if (now.hour() < 16) {
    return now.add(1, 'day').startOf('day');
  }
  return now.add(2, 'day').startOf('day');
};

const validationSchema = yup.object().shape({
  keyword: yup
    .string()
    .max(STRING_MAX_LENGTH, `키워드는 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('키워드를 입력해주세요.'),
  companyName: yup
    .string()
    .max(STRING_MAX_LENGTH, `업체명은 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('업체명을 입력해주세요.'),
  url: yup
    .string()
    .max(STRING_MAX_LENGTH, `URL은 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('URL을 입력해주세요.'),
  mid: yup
    .string()
    .max(STRING_MAX_LENGTH, `MID는 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('MID를 입력해주세요.'),
  startDate: yup
    .date()
    .min(getMinDate(), ({ min }) => `시작일은 ${min.format('YYYY-MM-DD')} 이후여야 합니다.`)
    .required('시작날짜을 입력해주세요.'),
  period: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('기간을 입력해주세요.')
    .positive('1일 부터 입력해주세요.'),
  rewardType: yup.string().required('리워드 타입을 선택해주세요.'),
  trafficRequest: yup
    .string()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value))
    .matches(NUMBER_CHECK_PATTERN, '숫자만 입력할 수 있습니다.')
    .test('MULTIPLE_OF_FIFTY', '50 단위로 입력해주세요.', (value) => value % 50 === 0)
    .max(STRING_MAX_LENGTH, `유입요청은 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('유입요청을 입력해주세요.'),
});

export default function CampaignCreateView() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    data.startDate = data.startDate ? format(new Date(data.startDate), 'yyyy-MM-dd') : null;
    API.CAMPAIGN_API.createCampaign(data)
      .then(() => {
        Swal.fire({
          title: '성공!',
          text: '캠페인 등록에 성공했습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
        navigate(`/campaign/${data.rewardType}`);
      })
      .catch((error) => {
        switch (error.response.data.type) {
          case 'ERROR': {
            Swal.fire({
              title: '실패!',
              text: error.response.data.description,
              icon: 'error',
              confirmButtonText: '확인',
            });
            break;
          }
          default: {
            const errorDetails = error.response.data.errors;
            Object.keys(errorDetails).forEach((field) => {
              setError(field, {
                type: 'field',
                message: errorDetails[field],
              });
            });
            break;
          }
        }
      });
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

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
                <Controller
                  name="keyword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="키워드"
                      variant="outlined"
                      error={!!errors.keyword}
                      helperText={errors.keyword?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="업체명"
                      variant="outlined"
                      error={!!errors.companyName}
                      helperText={errors.companyName?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="url"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="URL"
                      variant="outlined"
                      error={!!errors.url}
                      helperText={errors.url?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="mid"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="MID"
                      type="number"
                      variant="outlined"
                      error={!!errors.mid}
                      helperText={errors.mid?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="https://m.place.naver.com/place/XXXXXXXX/home (XXXXXXXX 해당된 숫자를 입력하세요)">
                              <IconButton>
                                <Iconify icon="eva:question-mark-circle-outline" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Typography variant="subtitle2">기간</Typography>
                <Box display="flex">
                  <FormControl variant="outlined" size="medium" sx={{ flexGrow: 1, mr: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ko}>
                      <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="시작날짜"
                            value={field.value}
                            onChange={field.onChange}
                            minDate={getMinDate()}
                            error={!!errors.startDate}
                            renderInput={(params) => (
                              <TextField {...params} error={!!errors.startDate} />
                            )}
                          />
                        )}
                      />
                      {errors.startDate && (
                        <FormHelperText error>{errors.startDate.message}</FormHelperText>
                      )}
                    </LocalizationProvider>
                  </FormControl>

                  <Controller
                    name="period"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="기간"
                        type="number"
                        variant="outlined"
                        error={!!errors.period}
                        helperText={errors.period?.message}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">일</InputAdornment>,
                        }}
                      />
                    )}
                  />
                </Box>

                <Typography variant="subtitle2">리워드</Typography>
                <Controller
                  name="rewardType"
                  defaultValue=""
                  control={control}
                  defaultValue="PLACE_TRAFFIC"
                  render={({ field }) => (
                    <FormControl component="fieldset" fullWidth variant="outlined" size="medium">
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="PLACE_TRAFFIC"
                          control={<Radio />}
                          label="플레이스 트래픽"
                        />
                        <FormControlLabel
                          value="SAVE_PLACE"
                          control={<Radio />}
                          label="플레이스 저장하기"
                        />
                        <FormControlLabel
                          value="AUTOCOMPLETE"
                          control={<Radio />}
                          label="자동 완성"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />

                <Controller
                  name="trafficRequest"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="유입요청"
                      variant="outlined"
                      type="number"
                      error={!!errors.trafficRequest}
                      helperText={errors.trafficRequest?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Box display="flex" flexDirection="column">
                              <IconButton
                                size="small"
                                sx={{ p: 0 }}
                                onClick={() => field.onChange(parseInt(field.value || 0) + 50)}
                              >
                                <Iconify icon="eva:arrow-up-outline" />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{ p: 0 }}
                                onClick={() =>
                                  field.onChange(Math.max(0, parseInt(field.value || 0) - 50))
                                }
                              >
                                <Iconify icon="eva:arrow-down-outline" />
                              </IconButton>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Stack>
            </CardContent>

            <Divider />

            <CardActions sx={{ py: 3, px: 3 }}>
              <Button
                type="submit"
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
