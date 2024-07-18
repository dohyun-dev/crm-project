import axios from 'axios';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { authState } from '../recoil/atoms';

// const API_BASE_URL = 'http://www.nfor.shop';
const API_BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
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
    (error) => {
      if (error.response.status === 403) {
        navigate('/login');
        Swal.fire({
          title: '실패!',
          text: '로그인 정보가 만료됐거나 접근 권한이 없습니다. 다시 로그인 해주세요',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    }
  );
};

export default axiosInstance;
