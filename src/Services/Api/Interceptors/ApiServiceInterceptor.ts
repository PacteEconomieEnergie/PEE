import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const apiUrl = window.REACT_APP_SERVER_URL
console.log(window.REACT_APP_SERVER_URL  );
class Interceptor {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: apiUrl,
            headers: {
                "Content-type": "application/json"
            },
        });  

        this.axiosInstance.interceptors.request.use(
            // @ts-ignore
            (config: AxiosRequestConfig<any>) => {
                if (!(config.data instanceof FormData)) {
                    config.headers = { ...config.headers, 'Content-Type': 'application/json' };
                }

                const token = localStorage.getItem('token');
                if (token) {
                    config.headers = config.headers || {};
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data;
            },
            (error) => {
                console.error('Response Error Interceptor:', error);
                return Promise.reject(error);
            }
        );
    }

    public getInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}

export default new Interceptor();  
