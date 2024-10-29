import React from "react";
import "../../public/assets/css/admindashboard.css";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import { useQuery } from "@apollo/client";
import { GET_ME_BENEFICIAIRE } from "../../lib/queries";
import {GET_TRACKING_PROJECTS} from "../../lib/queries";
import {GET_BENEFICIAIRE_AND_TRACKING_PROJECTS} from "../../lib/queries";
import DashboardLayout from "../../layouts/dashboardLayout";
import AdminStat from "../../components/admin-stat";
import DashboardTable from "../../components/dashboardTable";
import AdminProjectsTable from "../../components/adminProjectsTable";
import WaveCard from "../../components/wave-card";
import UsersCard from "../../components/users-card";
import CardUser from '../../components/CardUser';

const AdminDashboard = () => {
  const getNonValidProjects=(projects)=> {
    return projects.filter(project => project.isValid === false);
  }
  
  const { loading, error, data } = useQuery(GET_TRACKING_PROJECTS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;

  const dashboardStat = data?.getUsersToDashboard || {};

  // Extraction des valeurs avec des valeurs par défaut en cas d'absence
  const totalUsers = dashboardStat.totalUsers || 0;
  const allDonors = dashboardStat.allDonors || 0;
  const allBeneficiaries = dashboardStat.allBeneficiaries || 0;
  const statUserMonth = dashboardStat.statUserMonth || 0;
  const statDonor = dashboardStat.statDonor || 0;
  const statBeneficiary = dashboardStat.statBeneficiary || 0;
  
  const tracking_ps = data?.getTrackingProjects?.trackingProjects || [];
  const totalCreate = data?.getTrackingProjects?.totalCreate || 0;
  const totalDelete = data?.getTrackingProjects?.totalDelete || 0;
  const totalUpdate = data?.getTrackingProjects?.totalUpdate || 0;
  const project_ps=data?.getProjets || [];
  const nonValidProjects = getNonValidProjects(project_ps);
 


  return (
    <DashboardLayout>
      <div className="w-100 dashboard-container m-0 p-0">
        <div className="row g-1">
          {/* Left Column (Notifications Card) */}
          <div className="col-md-5 h-100">
            <div className="row row-cols-1 row-cols-md-1 g-2">
              <div className="col">
                <div className="card  bg-white">
                  <div className="  position-relative">
                    <div className="notify-me">
                      <span className="bi bi-bell d-icon"></span>
                      <span className="notify-number px-2">
                        {totalCreate+totalUpdate+totalDelete}
                      </span>
                    </div>
                  </div>

                  <div className="card-body bg-white ">
                    <div className="notify-line">
                      <span className="insert text-success bi bi-plus-circle"></span>
                      <span className="number">{totalCreate}</span>
                      <span className="text">Insertions effectuées</span>
                      <span className="look px-2 bi bi-eye-fill"></span>
                    </div>
                    <div className="notify-line">
                      <span className="upd text-primary bi bi-pencil"></span>
                      <span className="number">{totalUpdate}</span>
                      <span className="text">Mises à jour effectuées</span>
                      <span className="look px-2 bi bi-eye-fill"></span>
                    </div>
                    <div className="notify-line">
                      <span className="del text-danger bi bi-trash"></span>
                      <span className="number">
                        {totalDelete}
                      </span>
                      <span className="text">Suppressions effectuées</span>
                      <span className="look px-2 bi bi-eye-fill"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <AdminStat />
              </div>
              <div className="col">
                <WaveCard/>
              </div>
              <div className="col">
                <UsersCard/>
              </div>
            </div>
          </div>

          {/* Right Column (Main Dashboard Info) */}
          <div className="col-md-7">
          <div className="row">
   
        <CardUser 
            titre="Utilisateurs" 
            icon="bi-arrow-up-left" 
            isUp={true} 
            percentage={`${statUserMonth}`} 
            value={totalUsers}
        />
         <CardUser 
            titre="Bénéficiaires" 
            icon="bi-arrow-up-left" 
            isUp={true} 
            percentage={`${statBeneficiary}`} 
            value={allBeneficiaries}
        />
         <CardUser 
            titre="Donateurs" 
            icon="bi-arrow-up-left" 
            isUp={true} 
            percentage={`${statDonor}`} 
            value={allDonors}
        />
         <CardUser 
            titre="Dons" 
            icon="bi-arrow-up-left" 
            isUp={true} 
            percentage={`${statUserMonth}`} 
            value={`2500€`}
        />
   

   

   

   
</div>


            {/* Quick Query Buttons */}
            <div className="w-100 mt-4">
              <AdminProjectsTable projects={nonValidProjects} />
              {/* <div className="row row-cols-2 row-cols-md-4 g-3">
              <div className="col h-100">
                <button className="quick-query-btn w-100">
                  <i className="bi bi-filter"></i>
                  Nombre de comptes créés aujourd'hui
                </button>
              </div>

              <div className="col h-100">
                <button className="quick-query-btn w-100">
                  <i className="bi bi-filter"></i>
                  Nombre de donateurs inscrits aujourd'hui
                </button>
              </div>

              <div className="col h-100">
                <button className="quick-query-btn w-100">
                  <i className="bi bi-filter"></i>
                  Nombre de bénéficiaires inscrits aujourd'hui
                </button>
              </div>

              <div className="col h-100">
                <button className="quick-query-btn w-100">
                  <i className="bi bi-filter"></i>
                  Nombre de dons effectués aujourd'hui
                </button>
              </div>
            </div> */}
            </div>
          </div>
        </div>
        {/* <Table projects={projects} /> */}
      </div>
    </DashboardLayout>
  );
};
export default AdminDashboard;
