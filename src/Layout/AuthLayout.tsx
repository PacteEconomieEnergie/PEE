import React from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { SignIn } from '../modules/Auth/SignIn/SignIn.module';
import LoginPage from '../components/Login';
const AuthLayout = () => {
    return (
        <div className="">
            
            
                {/* <SignIn/> */}
                <LoginPage/>
            
        </div>
    );
};

export default AuthLayout;
