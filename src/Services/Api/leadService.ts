import ApiServiceInterceptor from "./Interceptors/ApiServiceInterceptor";

const axiosInstance=ApiServiceInterceptor.getInstance()

const leadService={
    async createLead(formData:FormData){
        return axiosInstance.post("/lead",formData,{
            headers:{
                "Content-Type":undefined
            }
        })
    },
   async getAllLeads() {
        return axiosInstance.get('/lead');
    },

   async getLeadById(id:number) {
        return axiosInstance.get(`/leads/${id}`);
    },

  async  getLeadByEmail(email:string) {
        return axiosInstance.get(`/leads/email/${email}`);
    },
}



export default leadService