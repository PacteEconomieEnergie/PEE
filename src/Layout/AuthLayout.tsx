import React from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { SignIn } from '../modules/Auth/SignIn/SignIn.module';
const AuthLayout = () => {
    return (
        <div className="flex h-screen bg-cyan-500">
            <div className="flex-1 flex justify-center items-center bg-gradient-to-r from-blue-500 to-teal-500">
                {/* Replace with your animated SVG */}
                <img src="/assets/SVG/teamWorkAnimate.svg" alt="Animated SVG" className="w-1/2 h-auto" />
            </div>
            <div className="flex-1 flex justify-center items-center">
                <SignIn/>
            </div>
        </div>
    );
};

export default AuthLayout;
