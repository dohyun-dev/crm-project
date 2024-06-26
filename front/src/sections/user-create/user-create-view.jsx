import React from 'react';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import {
  InputLabel,
  CardActions,
  CardContent,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

import API from '../../apis/member';
import Iconify from '../../components/iconify';

const STRING_MAX_LENGTH = 1024;
const EXIST_HYPHEN_CHECK_PATTERN = /^[0-9]+$/;

const validationSchema = yup.object().shape({
  companyName: yup
    .string()
    .max(STRING_MAX_LENGTH, `업체명은 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('업체명을 입력해주세요.'),
  username: yup
    .string()
    .max(STRING_MAX_LENGTH, `아이디는 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('아이디를 입력해주세요.'),
  password: yup
    .string()
    .max(STRING_MAX_LENGTH, `비밀번호는 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('비밀번호를 입력해주세요.'),
  businessRegistrationNumber: yup
    .string()
    .max(STRING_MAX_LENGTH, `사업자등록번호는 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('사업자등록번호를 입력해주세요.'),
  email: yup
    .string()
    .max(STRING_MAX_LENGTH, `이메일은 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .email('유효한 이메일을 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  contact: yup
    .string()
    .matches(EXIST_HYPHEN_CHECK_PATTERN, '연락처는 숫자만 입력할 수 있습니다.')
    .max(STRING_MAX_LENGTH, `연락처는 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('연락처를 입력해주세요.'),
  accountHolder: yup
    .string()
    .max(STRING_MAX_LENGTH, `예금주는 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('예금주를 입력해주세요.'),
});

export default function UserCreateView() {
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
    API.MEMBER.createMember(data)
      .then((response) => {
        Swal.fire({
          title: '성공!',
          text: '회원 생성에 성공했습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
        navigate('/user');
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

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="company">업체명</InputLabel>
                  <Controller
                    name="companyName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <OutlinedInput {...field} id="company" label="업체명" />}
                  />
                  {errors.companyName && (
                    <FormHelperText error>{errors.companyName.message}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="username">아이디</InputLabel>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <OutlinedInput {...field} id="username" label="아이디" />
                    )}
                  />
                  {errors.username && (
                    <FormHelperText error>{errors.username.message}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="password">비밀번호</InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <OutlinedInput {...field} id="password" label="비밀번호" />
                    )}
                  />
                  {errors.password && (
                    <FormHelperText error>{errors.password.message}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="businessRegistrationNumber">사업자등록번호</InputLabel>
                  <Controller
                    name="businessRegistrationNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <OutlinedInput
                        {...field}
                        id="businessRegistrationNumber"
                        label="사업자등록번호"
                      />
                    )}
                  />
                  {errors.businessRegistrationNumber && (
                    <FormHelperText error>
                      {errors.businessRegistrationNumber.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="email">이메일</InputLabel>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <OutlinedInput {...field} id="email" label="이메일" />}
                  />
                  {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="contact">연락처</InputLabel>
                  <Controller
                    name="contact"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <OutlinedInput {...field} id="contact" label="연락처" />}
                  />
                  {errors.contact && (
                    <FormHelperText error>{errors.contact.message}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="accountHolder">예금주</InputLabel>
                  <Controller
                    name="accountHolder"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <OutlinedInput {...field} id="accountHolder" label="예금주" />
                    )}
                  />
                  {errors.accountHolder && (
                    <FormHelperText error>{errors.accountHolder.message}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </CardContent>

            <Divider />

            <CardActions sx={{ py: 3, px: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Iconify icon="eva:checkmark-circle-2-outline" />}
                type="submit"
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
