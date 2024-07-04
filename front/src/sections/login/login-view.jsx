import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import API from '../../apis/api';

// ----------------------------------------------------------------------

const validationSchema = yup.object().shape({
  username: yup.string().required('아이디는 필수 항목입니다.'),
  password: yup.string().required('비밀번호는 필수 항목입니다.'),
});

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    API.AUTH_API.login({ ...data })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: '성공!',
          text: '로그인 되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
        router.push(`/`);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: '실패!',
          text: error.response.data.description,
          icon: 'error',
          confirmButtonText: '확인',
        });
      });
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          label="아이디"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        로그인
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">로그인</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            로그인해주세요.
            {/* <Link variant="subtitle2" sx={{ ml: 0.5 }}> */}
            {/*   Get started */}
            {/* </Link> */}
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
