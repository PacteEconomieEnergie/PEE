export const setUserRole = (role:any) => {
    localStorage.setItem('role', role);
  }
  
  export const getUserRole = () => {
    return localStorage.getItem('role');
  }
  
  export const clearUserRole = () => {
    localStorage.removeItem('role');
  }