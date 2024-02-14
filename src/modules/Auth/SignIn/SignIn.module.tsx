import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Input } from "antd";
import { loginSuccess } from "../../../store/auth/authSlice";
import ApiService from "../../../Services/Api/ApiService";
export const SignIn:React.FC=()=>{
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const [errors, setErrors] = useState({
        email: "",
        password: "",
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };

      
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError("");
        // Validation logic - Check for empty fields
        const newErrors = {
          email: formData.email.trim() === "" ? "Email is required" : "",
          password: formData.password.trim() === "" ? "Password is required" : "",
        };
    
        setErrors(newErrors);
    
        // Check if there are no errors
        if (!Object.values(newErrors).some((error) => error !== "")) {
          // Navigate to another component or perform an action on successful validation
          try {
            // Call the loginUser method from your ApiService
            const response = await ApiService.loginUser(formData.email, formData.password);
            
            
            // Dispatch loginSuccess action with the token
            dispatch(loginSuccess({ token: response.token }));

            // Navigate to the dashboard
            
        } catch (error:any) {
            console.error('Login Error:', error.response);
            setServerError(error.response?.data?.error || "An unexpected error occurred");
            // Handle login errors (e.g., show error message)
        }
          //navigate("/admin/Dashboard")
        }
      };
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    return(
        
        <div className="max-w-md w-full mx-4 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {serverError && (
        <p className="text-red-500 text-center my-2">{serverError}</p>
      )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
              
            </label>
            <Input.Password
               type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 pr-10"
              placeholder="Enter your password"
              
            />
            {/* <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-1 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button> */}
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    
    )

}