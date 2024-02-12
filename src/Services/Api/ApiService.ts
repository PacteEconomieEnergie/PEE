import ApiServiceInterceptor from './Interceptors/ApiServiceInterceptor';
import { AxiosInstance } from 'axios';
import urlConfig from "./Enpoints/url.json"
class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        // Get the Axios instance from the ApiServiceInterceptor
        this.axiosInstance = ApiServiceInterceptor.getInstance();
    }

    /*
     * Fetch all users
     */
    public async getAllUsers(): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/users/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /*
     * Add a new user
     */
    public async addUser(email: string, password: string, role: string): Promise<any> {
        try {
            const response = await this.axiosInstance.post(urlConfig.add, {
                Email: email,
                Password: password,
                Role: role,
            });
            console.log(response,'from the api service');
            
            return response;
        } catch (error) {
            throw error;
        }
    }

    /*
     * Login user
     */
    public async loginUser(email: string, password: string): Promise<any> {
        try {
            const response = await this.axiosInstance.post(urlConfig.login, {
                Email: email,
                Password: password,
            });
            console.log("API response:", response);
            return response;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    /*
     * Get user by email
     */
    public async getUserByEmail(email: string): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`"/users/${urlConfig.email}/${email}"`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    /*
     * Get user by ID
     */
    public async getUserById(id: number): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`"/users/${urlConfig.idUser}/${id}"`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getAllEngineers():Promise<any>{
        try{
            const response=await this.axiosInstance.get("/users/engineers")
            
            
            return response
        }catch(error){
            throw error;
        }
    }

    public async getAllClients(): Promise<any> {
        try {
          const response = await this.axiosInstance.get("/clients/");
          return response
        } catch (error) {
          throw error;
        }
      }
    

    // You can add more methods for other API requests as needed

    // ...
}

export default new ApiService();
