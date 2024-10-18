import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../providers/AppProvider';

const GuardRoute = ({ component: Component, redirectTo = '/dashboard' }) => {
  const { user } = useUser();
  const [isAuth, setIsAuth] = useState(user.isAuth);

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuth(user.isAuth);
    };

    
    checkAuthStatus();
  }, [user]);

  return isAuth ? <Navigate to={redirectTo} /> : <Component />;
};

export default GuardRoute;
