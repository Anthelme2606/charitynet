import React from 'react';
import UserManager from '../../components/userManager';
import DashboardLayout from "../../layouts/dashboardLayout"; 

const ManageUser = () => {
    return (
        <DashboardLayout>
            <UserManager />
        </DashboardLayout>
    );
};

export default ManageUser;
