import React, { useEffect } from 'react';
import AdminDashboard from './admins/dashboard';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
//   const { user } = useUser();
//   const token = localStorage.getItem('userToken');
const token='user';
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]); 

  if (!token) {
    return null; 
  }

 

  if(token){
    return <AdminDashboard />;
  }
  
  

  return <div>Access Denied</div>;
};

export default Dashboard;
