export const setUserRole = (role:any) => {
    localStorage.setItem('role', role);
  }
export const setEmail = (Email:any) => {
    localStorage.setItem('useremail', Email);
  }  
  export const getEmail = () => {
    return localStorage.getItem('useremail');
  }
  export const getUserRole = () => {
    return localStorage.getItem('role');
  }
  
  export const clearUserRole = () => {
    localStorage.removeItem('role');
  }

  export const setAuthInfo = ({ token, userId, Email, role,avatar }:any) => {
    
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('useremail', Email);
    localStorage.setItem('userRole', role);

  };
  
  export const clearAuthInfo = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('useremail');
    localStorage.removeItem('userRole');
  };
  
  export const getAuthInfo = () => {
    return {
      token: localStorage.getItem('authToken'),
      id: localStorage.getItem('userId'),
      Email: localStorage.getItem('useremail'),
      role: localStorage.getItem('userRole'),
      avatar:localStorage.getItem('avatar')
    };
  }