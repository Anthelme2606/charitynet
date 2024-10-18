import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from '../../pages/home';
import Login from "../../pages/authentification/login";
import Dashboard from "../../pages/dashboard";
import BeneficiaireDashboard from "../../pages/beneficiaires/projet";
import AuthRoute from "../middleware/auth";
import GuardRoute from "../middleware/guard";
import IsBeneficiary from "../middleware/bene";
import Logout from "../../partials/logout";
import ProjectTracking from "../../pages/beneficiaires/suivie";
import Wallet from "../../pages/beneficiaires/wallet";
import ROUTES from './names';

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGOUT} element={<Logout />} />
        
     
        <Route path={ROUTES.LOGIN} element={<GuardRoute component={Login} redirectTo={ROUTES.DASHBOARD} />} />
        <Route path={ROUTES.CAUSECREATE} element={<IsBeneficiary><BeneficiaireDashboard/></IsBeneficiary>} />
        <Route path={ROUTES.TRACK} element={<IsBeneficiary><ProjectTracking/></IsBeneficiary>} />
        <Route path={ROUTES.WALLET} element={<IsBeneficiary><Wallet/></IsBeneficiary>} />

       
        <Route path={ROUTES.DASHBOARD} element={<AuthRoute component={Dashboard} />} />
      </Routes>
    </>
  );
};

export default AppRoute;
