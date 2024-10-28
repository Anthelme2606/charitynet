// IsBeneficiary.js
import React from 'react';
import { useUser } from '../providers/AppProvider';
import { Navigate } from 'react-router-dom';

const IsAdmin = ({ children }) => {
    const { user } = useUser();
    // Vérifie si l'utilisateur est authentifié et de type 'Admin'
    if (!user || !user.isAuth || user.auth.userType !== 'Admin') {
        return <Navigate to="/login" />; 
    }

    return children; 
};

export default IsAdmin;
