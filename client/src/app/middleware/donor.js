// IsBeneficiary.js
import React from 'react';
import { useUser } from '../providers/AppProvider';
import { Navigate } from 'react-router-dom';

const IsDonor = ({ children }) => {
    const { user } = useUser();
    // Vérifie si l'utilisateur est authentifié et de type 'Beneficiary'
    if (!user || !user.isAuth || user.auth.userType !== 'Donor') {
        return <Navigate to="/login" />; 
    }

    return children; 
};

export default IsDonor;
