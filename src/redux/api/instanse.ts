import axios, * as axiosType from "axios";
// import axios, { AxiosInstance, AxiosRequestHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

// axios 인스턴스 생성
const instance: axiosType.AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_KEY, // API의 기본 URL을 설정합니다.
});

interface MyAxiosRequestConfig extends axiosType.AxiosRequestConfig {
  headers: axiosType.AxiosRequestHeaders;
}

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config:MyAxiosRequestConfig) => {
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
    if (!accessToken && refreshToken) config.headers.refreshtoken = refreshToken;
    return config 
  },
  (error) => {
    // 요청 인터셉터에서 에러가 발생한 경우 처리할 수 있습니다.
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
      document.cookie = `accessToken=${response.headers.authorization}; expires=${expiresTime.toUTCString()}; path=/;`;
    }
    if (response.headers.refreshtoken) {
      // console.log("config", response.headers.authorization);
      const expiresTime = new Date();
      expiresTime.setDate(expiresTime.getDate() + 3);
      document.cookie = `refreshtoken=${response.headers.refreshtoken}; expires=${expiresTime.toUTCString()}; path=/;`;
    }
    return response;
  },
  (error) => {
    // 응답 인터셉터에서 에러가 발생한 경우 처리할 수 있습니다.
    return Promise.reject(error);
  }
);

export default instance;
