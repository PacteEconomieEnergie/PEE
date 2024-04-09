// LoginPage.tsx
import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox,message } from 'antd';
import { AiOutlineGlobal } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import ApiService from '../Services/Api/ApiService';
import { loginSuccess } from '../store/auth/authSlice';
import ResetPassword from '../modules/Auth/ResetPassword';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: "",
      });
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleChange = (changedValues: any, allValues: any) => {
        setFormData(allValues);
      };
      const handleSubmit = async () => {
        try {
          // Call the loginUser method from your ApiService
          const response = await ApiService.loginUser(formData.email, formData.password);
    
          // Dispatch loginSuccess action with the token
          dispatch(loginSuccess({ token: response.token }));
    
          
         
        } catch (error: any) {
          console.error('Login Error:', error.response);
          // Displaying error message using Ant Design's message component
          const errorMessage = error.response?.data?.error || "An unexpected error occurred";
          message.error(errorMessage);
        }
      }
  
  const showResetPasswordModal = () => {
    setIsModalVisible(true);
  };

  const closeResetPasswordModal = () => {
    setIsModalVisible(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-2xl">
        <div className="flex justify-center">
          {/* Logo and Title here */}
          <img src="/images/Picture1.png" alt="Logo" className="w-48 h-auto" />
        </div>
        <h1 className="text-lg font-bold text-center">Bienvenue</h1>
        <p className="text-center text-sm  ">Merci de vous identifier.</p>
        <Form
          
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onValuesChange={handleChange}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={showResetPasswordModal} className="text-blue-500 hover:text-blue-600 text-sm float-centre">
              Forgot Password?
            </Button>
            <ResetPassword isVisible={isModalVisible} onClose={closeResetPasswordModal}/>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Se souvenir de moi</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button  htmlType="submit" className="w-full bg-lime-500">
              Connexion
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center space-x-4 text-sm">
          <a href="http://www.pe-e.fr" >
            {/* Icon from Ant Design */}
            <Button shape="circle" icon={<AiOutlineGlobal />} className="m-2" />
            www.pe-e.fr
          </a>
          <a href="mailto:support@pe-e.fr">
            {/* Icon from Ant Design */}
            <Button shape="circle" icon={<FiMail />} className="m-2"  />
            support@pe-e.fr
          </a>
        </div>
        
      </div>
      <p className="text-center text-xs text-gray-700 mt-4">Copyright © 2024</p>
    </div>
  );
};

export default LoginPage;
