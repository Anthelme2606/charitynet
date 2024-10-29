import React from 'react';
import RapportList from "../../components/rapport";

import DashboardLayout from "../../layouts/dashboardLayout";

const RapportPage=()=>{

    return (
        <DashboardLayout>

            <RapportList/>
        </DashboardLayout>
    );
}
export default RapportPage;