import React from 'react';
import { NavLink } from 'react-router-dom';
import '../public/assets/css/user-info.css';
import userLogo from '../public/assets/images/c1.png';
import {useUser} from '../app/providers/AppProvider';
import MyQr from './user-qr';
import ROUTES from '../app/routes/names';
const UserInfo = () => {
    const {user} =useUser();
    const auth=user.auth;
  return (
    <div className="user-sidebar">
      <div className="card-user">
        <div className="user-info">
          <img src={userLogo} className="user-avatar" alt="User Avatar" />
          <h5 className="user-name">
            {auth.username}
          </h5>
        </div>
       
        <p className="user-text">Mail : {auth.email}</p>
        <p className="user-text">Pays : {auth.country}</p>
        <p className="user-text">N° : {auth.referenceNumber}</p>
        <p className="user-text">Utilisateur : {auth.userType} </p>
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center mb-4">
        <MyQr email={auth.email}/>
      </div>
      <div className="user-actions">
        <NavLink href="#" className="btn btn-profile link">
          <i className="bi bi-plus-circle"></i> Ajouter un compte
        </NavLink>
       {auth.userType!=='OBNL' &&( <NavLink href="#" className="btn btn-profile link">
          <i className="bi bi-person-badge"></i> Devenir OBNL
        </NavLink>)}
       {auth.userType!=='Beneficiary'&& ( <NavLink href="#" className="btn btn-profile link">
          <i className="bi bi-person-plus"></i> Devenir Bénéficiaire
        </NavLink>)}
        <NavLink to={ROUTES.LOGOUT} className="btn btn-profile link btn-danger">
          <i className="bi bi-box-arrow-right"></i> Déconnexion
        </NavLink>
      </div>
    </div>
  );
};

export default UserInfo;
