import React, { useEffect,useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import { Spin } from 'antd';

const ProtectedRoute = ({ children, allowedRoles }:any) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useSelector((state:any) => state.auth);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(role))) {
            
            dispatch(logout());
            navigate('/');
            setIsChecking(false);
        }else {
            setIsChecking(false);
        }
    }, [isAuthenticated, role, allowedRoles, dispatch, navigate]);

    if (isChecking) {
        // Render the Spin component from Ant Design
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
