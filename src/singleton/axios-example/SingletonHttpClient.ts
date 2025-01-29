import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { isAxiosError } from 'axios';

class SingletonHttpClient {
  private static instance: SingletonHttpClient; // HttpClient 타입의 값을 갖는다고 선언
  private axiosInstance: AxiosInstance;

  // 인스턴스를 생성하지 못하도록 private
  private constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
    this.setInterceptor();
  }
  static setSingletonInstance(config?: AxiosRequestConfig): SingletonHttpClient {
    if (!SingletonHttpClient.instance) {
      SingletonHttpClient.instance = new SingletonHttpClient(config);
    }
    return SingletonHttpClient.instance;
  }
  setInterceptor() {
    this.axiosInstance.interceptors.request.use(this.onRequestFulfilled, this.onRequestRejected);
    this.axiosInstance.interceptors.response.use();
  }
  onRequestFulfilled(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    config.headers['Authorization'] = 'Bearer ${token}';
    return config;
  }
  onRequestRejected(error: AxiosError) {
    return Promise.reject(error);
  }
  onResponseFulfilled(response: AxiosResponse) {
    return response;
  }
  onResponseRejected(error: AxiosError) {
    if (!isAxiosError(error) || error.response == null) return Promise.reject(error);
    const { status } = error.response;

    if (status === 401) {
      // 이런 저런 로직..
    }
    if (status === 500) {
      // 서버 에러 페이지로 리다이렉트 뭐 그런거..
    }
    return Promise.reject(error);
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export default SingletonHttpClient;
