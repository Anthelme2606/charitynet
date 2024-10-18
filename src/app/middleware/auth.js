import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../providers/AppProvider';

const AuthRoute = ({ component: Component }) => {
  const { user } = useUser();
  const [isAuth, setIsAuth] = useState(user.isAuth);

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuth(user.isAuth);
    };

    
    const interval = setInterval(checkAuthStatus, 300000); 

    checkAuthStatus();

    return () => clearInterval(interval);
  }, [user]);

  return isAuth ? <Component /> : <Navigate to="/login" />;
};

export default AuthRoute;
