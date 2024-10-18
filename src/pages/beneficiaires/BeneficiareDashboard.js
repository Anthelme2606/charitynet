import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../public/assets/css/user.css';
import Navbar from '../../components/navbar';
import ROUTES from '../../app/routes/names';
import Sidebar from '../../components/sidebar';
import ProjectList from '../../partials/projectlist';
import UserInfo from '../../partials/user-info';
import Causes from '../../components/causes';
import useHasSidebar from '../../hooks/sidebarHook';
import DashboardLayout from '../../layouts/dashboardLayout';
const BeneficiaireDashboard = () => {
 
  const { hasSidebar, isSidebarClosed } = useHasSidebar();
  return (
    
    <DashboardLayout>
        <div className="w-100 m-0 p-0">
          <div className="row g-2">
            <div className="col-md-9 h-100">
              <div className="row row-cols-1 row-cols-md-4 g-2">
              <div className="col">
              <div className="card outline h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <span>Projets contribués</span>
                    <span className="bi bi-people icon"></span>
                  </div>
                  <div className="text-center">
                    <span>45</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card outline h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <span>Causes partagées</span>
                    <span className="bi bi-share icon"></span>
                  </div>
                  <div className="text-center">
                    <span>45</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card outline h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <span>Dons éffectués</span>
                    <span className="bi bi-cash icon"></span>
                  </div>
                  <div className="text-center">
                    <span>45</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card outline h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <span> projets</span>
                    <span className="bi bi-briefcase icon"></span>
                  </div>
                  <div className="text-center">
                    <span>45</span>
                  </div>
                </div>
              </div>
            </div>
              </div>
              <div className="mt-2">
              <Causes/>
              </div>
              <div className="mt-2">
                <ProjectList/>
              </div>
            
            </div>
            <div className="col-md-3 h-100">
                <UserInfo/>
            </div>
            
          </div>
        </div>
        </DashboardLayout>
  );
};

export default BeneficiaireDashboard;
