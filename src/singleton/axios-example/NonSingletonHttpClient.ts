import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class NonSingletonHttpClient {
  private client: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create(config);
  }
  getClient() {
    return this.client;
  }
}

export default NonSingletonHttpClient;
