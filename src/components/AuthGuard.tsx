import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { storage } from '../utils/storage';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = storage.isLoggedIn();

  // 如果用户未登录且当前路径不是登录页，重定向到登录页
  if (!isLoggedIn && location.pathname !== '/login') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 如果用户已登录但访问登录页，重定向到首页
  if (isLoggedIn && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;