import axios, * as axiosType from 'axios';
import { MyAxiosRequestConfig } from '../../types/async';
// axios 인스턴스 생성
const instance: axiosType.AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_KEY,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config: MyAxiosRequestConfig) => {
    const accessToken =
      document.cookie &&
      document.cookie
        .split(';')
        .filter((cookies) => cookies.includes('accessToken'))[0]
        ?.split('=')[1];
    const Refresh =
      document.cookie &&
      document.cookie
        .split(';')
        .filter((cookies) => cookies.includes('Refresh'))[0]
        ?.split('=')[1];
    if (accessToken) config.headers.authorization = accessToken;
    if (!accessToken && Refresh)
      config.headers.Refresh = Refresh;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response: axiosType.AxiosResponse) => {
    if (response.headers.Authorization) {
      console.log("config", response.headers.Authorization);
      const expiresTime = new Date();
      expiresTime.setMinutes(expiresTime.getMinutes() + 30);
      document.cookie = `accessToken=${response.headers.Authorization
        }; expires=${expiresTime.toUTCString()}; path=/;`;
    }
    if (response.headers.Refresh) {
      // console.log("config", response.headers.authorization);
      const expiresTime = new Date();
      expiresTime.setDate(expiresTime.getDate() + 3);
      document.cookie = `Refresh=${response.headers.Refresh
        }; expires=${expiresTime.toUTCString()}; path=/;`;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
