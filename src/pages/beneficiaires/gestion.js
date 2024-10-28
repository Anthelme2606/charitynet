import React from 'react';
import Table from '../../components/Table';
import Loader from '../../components/Loader';
import { useQuery } from "@apollo/client";
import { GET_ME_BENEFICIAIRE } from '../../lib/queries';
import DashboardLayout from "../../layouts/dashboardLayout";

const Gestionnaire = () => {
    const { loading, error, data } = useQuery(GET_ME_BENEFICIAIRE, {
        fetchPolicy: "network-only", 
    });

    if (loading) return <Loader />;
    if (error) return <p>Error loading data: {error.message}</p>;

    // Vérifie que data et myProjets sont définis avant de passer à Table
    const projects = data?.getCurrentBeneficiaire?.myProjets || [];

    return (
        <DashboardLayout> 
        <Table projects={projects} />
        </DashboardLayout>
    );
};

export default Gestionnaire;
