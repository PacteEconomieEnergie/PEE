import ApiServiceInterceptor from "../Interceptors/ApiServiceInterceptor";
import { ModificationData } from "./StudiesType";

const axiosInstance=ApiServiceInterceptor.getInstance()

const studyService={
    async addStudy(formData: FormData, clientId: number, userId: number,createdById:number) {
        // The URL might need to be adjusted based on your actual API endpoint.
        const url = `/studies/add/${clientId}/${userId}/${createdById}`;
        return axiosInstance.post(url, formData, {
            headers: {
                // Explicitly setting Content-Type header to undefined
                // to ensure Axios doesn't automatically set it to JSON
                // This allows the browser to correctly set the Content-Type
                // to multipart/form-data along with the necessary boundary
                'Content-Type': undefined
            },
        });
    },
    async getAllStudies() {
        return axiosInstance.get(`/studies`);
    },
    async addModification(modificationData: ModificationData, studyId: number, userId: number) {
        const formData = new FormData();
        Object.keys(modificationData).forEach(key => {
            formData.append(key, modificationData[key]);
        });
        return axiosInstance.put(`/studies/add/${studyId}/${userId}`, formData);
    },
    async getStudyByIdUser(userId:number){
        return  axiosInstance.get(`/studies/${userId}`)
    },
    async updateStudyStatus(studyId:number,newStaus:any){
       
        
        return   axiosInstance.patch(`/studies/${studyId}/status`,{Status:newStaus})
    },
    async uploadSyntheseFile (studyId:number,file:Blob){
        const formData = new FormData();
        formData.append("pdfFile",file)
        return axiosInstance.patch(`/studies/${studyId}`,formData,{
            headers:{

                'Content-Type': undefined
            }
        })
    },
    async getEngineersStudies() {
        // Adjust the URL if your endpoint for fetching engineers' studies is different
        return axiosInstance.get(`/studies/engineers`);
    }
}


export default studyService;