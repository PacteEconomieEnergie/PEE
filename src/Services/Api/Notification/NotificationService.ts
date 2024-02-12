import axios from 'axios';
import ApiServiceInterceptor from '../Interceptors/ApiServiceInterceptor';
const API_BASE_URL = 'http://localhost:3000'; // Update with your actual backend URL
const axiosInstance=ApiServiceInterceptor.getInstance()
export const ApiService = {
  fetchUserNotifications: async (userId:any) => {
    try {
      const response = await axiosInstance.get(`/notifications/${userId}`);
      
      
      return response;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },
  markNotificationAsSeen: async (notificationId:any) => {
    try {
      const response = await axiosInstance.patch(`/notifications/${notificationId}`, { seen: true });
      return response;
    } catch (error) {
      console.error('Error marking notification as seen:', error);
      throw error;
    }
  },
  deleteNotification: async (notificationId:any) => {
    try {
      await axiosInstance.delete(`/notifications/${notificationId}`);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },
  // Add other API methods as needed
};
