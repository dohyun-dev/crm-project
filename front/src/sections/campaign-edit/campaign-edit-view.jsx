import dayjs from 'dayjs';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { ko } from 'date-fns/locale';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';

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
import { Radio, Tooltip, RadioGroup, CardActions, CardContent, FormControl } from '@mui/material';

import API from '../../apis/api';
import Iconify from '../../components/iconify';

const STRING_MAX_LENGTH = 1024;
const NUMBER_CHECK_PATTERN = /^[0-9]+$/;

const validationSchema = yup.object().shape({
  keyword: yup
    .string()
    .max(STRING_MAX_LENGTH, `키워드는 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('키워드를 입력해주세요.'),
  companyName: yup
    .string()
    .max(STRING_MAX_LENGTH, `업체명은 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .when('rewardType', {
      is: (value) => value !== 'AUTOCOMPLETE',
      then: yup.string().required('업체명을 입력해주세요.'),
    }),
  url: yup
    .string()
    .max(STRING_MAX_LENGTH, `URL은 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .when('rewardType', {
      is: (value) => value !== 'AUTOCOMPLETE',
      then: yup.string().required('URL을 입력해주세요.'),
    }),
  mid: yup
    .string()
    .max(STRING_MAX_LENGTH, `MID는 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .when('rewardType', {
      is: (value) => value !== 'AUTOCOMPLETE',
      then: yup.string().required('MID를 입력해주세요.'),
    }),
  startDate: yup.date().required('시작날짜을 입력해주세요.'),
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

export default function CampaignEditView() {
  const navigate = useNavigate();
  const { campaignId } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      keyword: '',
      companyName: '',
      url: '',
      mid: '',
      startDate: null,
      endDate: null,
      rewardType: 'PLACE_TRAFFIC',
      trafficRequest: 0,
    },
  });

  const rewardType = watch('rewardType');

  useEffect(() => {
    getCampaign(campaignId);
  }, [campaignId]);

  function getCampaign(id) {
    API.CAMPAIGN_API.getCampaign(id)
      .then((response) => {
        const campaignData = response.data;
        Object.keys(campaignData).forEach((field) => {
          if (field === 'startDate') {
            setValue(field, campaignData[field] ? dayjs(campaignData[field]) : null);
          } else {
            setValue(field, campaignData[field] || '');
          }
        });
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
  }

  const onSubmit = (data) => {
    if (data.rewardType === 'AUTOCOMPLETE') {
      data.companyName = '';
      data.url = '';
      data.mid = '';
    }

    data.startDate = data.startDate ? format(new Date(data.startDate), 'yyyy-MM-dd') : null;
    data.endDate = data.endDate ? format(new Date(data.endDate), 'yyyy-MM-dd') : null;

    console.log(data);
    API.CAMPAIGN_API.editCampaign(campaignId, data)
      .then(() => {
        Swal.fire({
          title: '성공!',
          text: '캠페인 수정이 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
        navigate(
          `/campaign/${data.rewardType
            .toLowerCase()
            .replace(/(_\w)/g, (matches) => matches[1].toUpperCase())}`
        );
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
      <Stack mb={4}>
        <Box sx={{ display: 'flex' }} justifyContent="space-between" alignItems="center">
          <Typography variant="h4">캠페인 수정</Typography>

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
                <FormControl>
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
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title={
                                  <span>
                                    키워드+노출어 전체입력
                                    <br />
                                    Ex)서울맛집 0000
                                  </span>
                                }
                              >
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
                </FormControl>

                {rewardType !== 'AUTOCOMPLETE' && (
                  <>
                    <FormControl>
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
                    </FormControl>

                    <FormControl>
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
                    </FormControl>

                    <FormControl>
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
                    </FormControl>
                  </>
                )}

                <Typography variant="subtitle2">기간</Typography>
                <Box display="flex">
                  <FormControl fullWidth variant="outlined">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ko}>
                      <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => {
                          const endDate = getValues('endDate');
                          const maxStartDate = endDate ? dayjs(endDate).subtract(1, 'day') : null;
                          return (
                            <DatePicker
                              label="시작 날짜"
                              format="YYYY-MM-DD"
                              value={field.value ? dayjs(field.value) : null}
                              onChange={(newValue) => field.onChange(newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors.startDate}
                                  helperText={errors.startDate?.message}
                                />
                              )}
                              maxDate={maxStartDate}
                            />
                          );
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <FormControl fullWidth variant="outlined" sx={{ ml: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ko}>
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => {
                          const startDate = getValues('startDate');
                          const minEndDate = startDate ? dayjs(startDate).add(1, 'day') : null;
                          return (
                            <DatePicker
                              label="종료 날짜"
                              format="YYYY-MM-DD"
                              value={field.value ? dayjs(field.value) : null}
                              onChange={(newValue) => field.onChange(newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors.endDate}
                                  helperText={errors.endDate?.message}
                                />
                              )}
                              minDate={minEndDate}
                            />
                          );
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>

                <Typography variant="subtitle2">리워드</Typography>
                <FormControl>
                  <Controller
                    name="rewardType"
                    defaultValue=""
                    control={control}
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
                </FormControl>

                <FormControl>
                  <Controller
                    name="trafficRequest"
                    control={control}
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
                </FormControl>
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
                수정하기
              </Button>
            </CardActions>
          </Card>
        </Stack>
      </form>
    </Container>
  );
}
