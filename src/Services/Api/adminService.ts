import ApiServiceInterceptor from "./Interceptors/ApiServiceInterceptor";
import { AxiosInstance } from "axios";

class adminService {
    private axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = ApiServiceInterceptor.getInstance();
    }
    

    public async fetchDashboardData(): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/stats/dashboard');
            return response;
        } catch (error) {
            throw error;
        }
    }
}


export default new adminService();