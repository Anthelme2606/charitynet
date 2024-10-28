import React from 'react';
import '../public/assets/css/components/admin-stat.css';
import Loader from "./Loader";
import { useQuery } from "@apollo/client";
import { GET_ADMIN_STAT } from "../lib/queries";

const ProgressBar = ({ label, percentage, value, colorClass }) => {
    return (
        <div className={`stat-container ${colorClass}`}>
            <div className="stat-label">{label}</div>
            <div className="progress-bar-stat">
                <div className="progress h-100" style={{ width: `${percentage}%` }}>
                    {value}
                </div>
            </div>
        </div>
    );
};

const AdminStat = () => {
    const { loading, error, data } = useQuery(GET_ADMIN_STAT, {
        fetchPolicy: "network-only",
    });

    if (loading) return <Loader />;
    if (error) return <p>Error loading data: {error.message}</p>;

    const adminStat = data?.getAdminStat;
    const beneficiaryPercentage = adminStat?.beneficiaryPercentage || 0;
    const donorPercentage = adminStat?.donorPercentage || 0;
    const monthlyProjectPercentage = adminStat?.monthlyProjectPercentage || 0;
    const obnlPercentage = adminStat?.obnlPercentage || 0;

    return (
        <div className="stat-container">
            <ProgressBar label="Projets" percentage={monthlyProjectPercentage} value={monthlyProjectPercentage} colorClass="projects" />
            <ProgressBar label="Bénéficiaires" percentage={beneficiaryPercentage} value={beneficiaryPercentage} colorClass="beneficiaries" />
            <ProgressBar label="Donateurs" percentage={donorPercentage} value={donorPercentage} colorClass="donors" />
            <ProgressBar label="OBNL" percentage={obnlPercentage} value={obnlPercentage} colorClass="nonprofits" />
        </div>
    );
};

export default AdminStat;
