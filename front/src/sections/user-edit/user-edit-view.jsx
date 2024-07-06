import * as yup from 'yup';
import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import {
  Select,
  TextField,
  InputLabel,
  CardActions,
  CardContent,
  FormControl,
} from '@mui/material';

import API from '../../apis/api';
import Iconify from '../../components/iconify';

const STRING_MAX_LENGTH = 1024;
const EXIST_HYPHEN_CHECK_PATTERN = /^[0-9]+$/;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(STRING_MAX_LENGTH, `회원이름은 최대 ${STRING_MAX_LENGTH}자까지 입력 가능합니다.`)
    .required('회원이름을 입력해주세요.'),
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

export default function UserEditView() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    getMember(userId);
  }, [userId]);

  function getMember(memberId) {
    API.MEMBER_API.getMember(memberId)
      .then((response) => {
        const memberData = response.data;
        console.log(memberData);
        Object.keys(memberData).forEach((field) => {
          setValue(field, memberData[field]);
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
    API.MEMBER_API.editMember(userId, data)
      .then((response) => {
        Swal.fire({
          title: '성공!',
          text: '회원이 수정되었습니다.',
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
          <Typography variant="h4">회원수정</Typography>

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
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="name"
                        label="회원이름"
                        variant="outlined"
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                      />
                    )}
                  />
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="username"
                        label="아이디"
                        variant="outlined"
                        size="small"
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="password"
                        label="비밀번호"
                        variant="outlined"
                        size="small"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                      />
                    )}
                  />
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <Controller
                    name="businessRegistrationNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="businessRegistrationNumber"
                        label="사업자등록번호"
                        variant="outlined"
                        size="small"
                        error={!!errors.businessRegistrationNumber}
                        helperText={
                          errors.businessRegistrationNumber
                            ? errors.businessRegistrationNumber.message
                            : ''
                        }
                      />
                    )}
                  />
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="email"
                        label="이메일"
                        variant="outlined"
                        size="small"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                      />
                    )}
                  />
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <Controller
                    name="contact"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="contact"
                        label="연락처"
                        variant="outlined"
                        size="small"
                        error={!!errors.contact}
                        helperText={errors.contact ? errors.contact.message : ''}
                      />
                    )}
                  />
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small">
                  <Controller
                    name="accountHolder"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="accountHolder"
                        label="예금주"
                        variant="outlined"
                        size="small"
                        error={!!errors.accountHolder}
                        helperText={errors.accountHolder ? errors.accountHolder.message : ''}
                      />
                    )}
                  />
                </FormControl>

                <FormControl fullWidth variant="outlined" size="small" error={!!errors.role}>
                  <InputLabel id="role-label">권한</InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="role-label"
                        id="role"
                        label="권한"
                        variant="outlined"
                        size="small"
                      >
                        <MenuItem value="USER">일반회원</MenuItem>
                        <MenuItem value="ADMIN">관리자</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <Typography variant="body2" color="error">
                      {errors.role.message}
                    </Typography>
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
