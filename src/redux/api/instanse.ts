import axios, * as axiosType from "axios";
import { MyAxiosRequestConfig } from "../../types";
// axios 인스턴스 생성
const instance: axiosType.AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config: MyAxiosRequestConfig) => {
    const accessToken =
      document.cookie &&
      document.cookie
        .split(";")
        .filter((cookies) => cookies.includes("accessToken"))[0]
        ?.split("=")[1];
    const refreshToken =
      document.cookie &&
      document.cookie
        .split(";")
        .filter((cookies) => cookies.includes("refreshToken"))[0]
        ?.split("=")[1];
    if (accessToken) config.headers.authorization = accessToken;
    if (!accessToken && refreshToken) config.headers.refresh = refreshToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response: axiosType.AxiosResponse) => {
    if (response.headers.authorization) {
      // console.log("config", response.headers.authorization);
      const expiresTime = new Date();
      expiresTime.setMinutes(expiresTime.getMinutes() + 30);
      document.cookie = `accessToken=${
        response.headers.authorization
      }; expires=${expiresTime.toUTCString()}; path=/;`;
    }
    if (response.headers.refresh) {
      // console.log("config", response.headers.authorization);
      const expiresTime = new Date();
      expiresTime.setDate(expiresTime.getDate() + 14);
      document.cookie = `refreshToken=${
        response.headers.refresh
      }; expires=${expiresTime.toUTCString()}; path=/;`;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const instanceLogout: axiosType.AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

instanceLogout.interceptors.request.use((config: MyAxiosRequestConfig) => {
  const accessToken =
    document.cookie &&
    document.cookie
      .split(";")
      .filter((cookies) => cookies.includes("accessToken"))[0]
      ?.split("=")[1];
  const refreshToken =
    document.cookie &&
    document.cookie
      .split(";")
      .filter((cookies) => cookies.includes("refreshToken"))[0]
      ?.split("=")[1];
  accessToken && (config.headers.authorization = accessToken);
  refreshToken && (config.headers.refresh = refreshToken);
  return config;
});

export { instance, instanceLogout };
