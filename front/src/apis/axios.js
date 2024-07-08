import axios from 'axios';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import API from './api';
import { authState } from '../recoil/atoms';
import { decodeJWTWithoutVerification } from '../utils/jwt-utils';

const API_BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosInstance2 = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const useAxiosInterceptors = () => {
  const [memberInfo, setMemberInfo] = useRecoilState(authState);
  const navigate = useNavigate();

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        const response = await API.AUTH_API.reissue();
        setMemberInfo((prevState) => ({
          accessToken: response.data.accessToken,
          ...decodeJWTWithoutVerification(response.data.accessToken),
        }));
        return axiosInstance(originalRequest);
      }
      if (error) {
        navigate('/login');
        Swal.fire({
          title: '실패!',
          text:
            error.response.status === 403
              ? '접근 권한이 없습니다. 다시 로그인 해주세요'
              : '로그인 정보가 만료되었습니다. 다시 로그인해주세요.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    }
  );
};

export default axiosInstance;
