// src/components/DashboardLayout.js
import React ,{useEffect} from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { NavLink } from 'react-router-dom';
import '../public/assets/css/user.css';
import ROUTES from '../app/routes/names';
import ProjectList from '../partials/projectlist';
import UserInfo from '../partials/user-info';
import Causes from '../components/causes';
import useHasSidebar from '../hooks/sidebarHook';
import { useQuery } from "@apollo/client";
import { useUser } from '../app/providers/AppProvider';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { CURRENT_USER } from "../lib/queries";

const DashboardLayout = ({ children}) => {
  const { user, setUser } = useUser();
  const { loading, error, data } = useQuery(CURRENT_USER, {
    skip: !user.isAuth,
    fetchPolicy: "network-only",
  });

  const { isSidebarClosed } = useHasSidebar();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // If the query is successful and user data is available
  //   if (data && data.currentUser) {
  //     // Update user state with the fetched data
  //     setUser((prev) => ({
  //       ...prev,
  //       isAuth: true, // Set isAuth to true
  //       auth: {
  //         userType: data.currentUser.userType,
  //         username: data.currentUser.username,
  //         email: data.currentUser.email,
  //         country:data.currentUser.country,
  //         reference:data.currentUser.referenceNumber,
  //       },
  //     }));
  //   }
  // }, [data, setUser]); // Only need data and setUser as dependencies

  // useEffect(() => {
  //   // Check for loading or error state
  //   if (loading) return; // Just wait for loading to finish
  //   if (error) {
  //     console.error("Error fetching user data:", error);
  //     navigate('/login'); // Redirect to login on error
  //     return;
  //   }
  //   if (!user.isAuth) {
  //     navigate('/login');
  //     return;
  //   }
  // },[user, loading,error,navigate]);
  
  //   if (loading) return <Loader />; 
  //   if (error) return <p>Une erreur est survenue. Veuillez réessayer.</p>; 
  
  return (
    <div className="w-100 m-0 p-0">
      <Navbar/>
      <Sidebar/>
      <div className={`main-content ${isSidebarClosed? 'extend':''}`}>
          {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
