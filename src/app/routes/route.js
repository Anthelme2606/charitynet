import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from '../../pages/home';
import Login from "../../pages/authentification/login";
import Signup from "../../pages/authentification/signup";
import Dashboard from "../../pages/dashboard";
import BeneficiaireDashboard from "../../pages/beneficiaires/projet";
import AuthRoute from "../middleware/auth";
import GuardRoute from "../middleware/guard";
import IsBeneficiary from "../middleware/bene";
import IsAdmin from "../middleware/admin";
import Logout from "../../partials/logout";
import ProjectTracking from "../../pages/beneficiaires/suivie";
import Wallet from "../../pages/beneficiaires/wallet";
import DetailProjectPage from "../../pages/admins/detailsProject";
import ManageUser from "../../pages/admins/manage-user-page";
import ManageDon from "../../pages/admins/dons-manager-page";
import About from "../../pages/about";
import Gestionnaire from "../../pages/beneficiaires/gestion";
import ROUTES from './names';

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGOUT} element={<Logout />} />
        
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path="/project/:id" element={<IsAdmin><DetailProjectPage /></IsAdmin>
        } />
         <Route path={ROUTES.USERMANAGER}element={<IsAdmin><ManageUser /></IsAdmin>
        } />
         <Route path={ROUTES.DONMANAGER}element={<IsAdmin><ManageDon /></IsAdmin>
        } />
     
        <Route path={ROUTES.LOGIN} element={<GuardRoute component={Login} redirectTo={ROUTES.DASHBOARD} />} />
        <Route path={ROUTES.CAUSECREATE} element={<IsBeneficiary><BeneficiaireDashboard/></IsBeneficiary>} />
        <Route path={ROUTES.TRACK} element={<IsBeneficiary><ProjectTracking/></IsBeneficiary>} />
        <Route path={ROUTES.WALLET} element={<IsBeneficiary><Wallet/></IsBeneficiary>} />
        <Route path={ROUTES.ABOUT} element={<IsBeneficiary><About/></IsBeneficiary>} />
        <Route path={ROUTES.GESTION} element={<IsBeneficiary><Gestionnaire/></IsBeneficiary>} />

       
        <Route path={ROUTES.DASHBOARD} element={<AuthRoute component={Dashboard} />} />
      </Routes>
    </>
  );
};

export default AppRoute;
