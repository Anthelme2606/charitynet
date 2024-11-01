import React from "react";
import DashboardLayout from "../../layouts/dashboardLayout";
import Card from "../../components/Card";
import CardUser from "../../components/CardUser";
import LineGraph from "../../components/LineGraph";
import DonationChart from "../../components/DonationChart";
import RapportCard from "../../components/RapportCard";
import UserTable from "../../components/UserTable";
import {GET_TRACKING_PROJECTS} from "../../lib/queries";
import AdminProjectsTable from "../../components/adminProjectsTable";
import Loader from "../../components/Loader";
import { useQuery } from "@apollo/client";

const DonorDashboard = () => {
  const getValidProjects=(projects)=> {
    return projects.filter(project => project?.isValid === true);
  }
  
  const { loading, error, data } = useQuery(GET_TRACKING_PROJECTS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;
  const project_ps=data?.getProjets || [];
  const validProjects = getValidProjects(project_ps);
  console.log(validProjects);

  const rapportsData = [
    {
      nom: "Rapport Q1 2023",
      type: "pdf",
      url: "https://example.com/rapport1.pdf"
    },
    {
      nom: "Présentation Projet X",
      type: "docx",
      url: "https://example.com/presentation.docx"
    },
    {
      nom: "Analyse Financière",
      type: "pdf",
      url: "https://example.com/analyse.pdf"
    },
    {
      nom: "Plan Marketing 2023",
      type: "docx",
      url: "https://example.com/marketing.docx"
    }
  ];

  const users = [
    { email: "user1@example.com", userType: "Beneficiary", country: "France" },
    {
      email: "user2@example.com",
      userType: "Beneficiary",
      country: "Belgique"
    },
    { email: "user3@example.com", userType: "Beneficiary", country: "Suisse" }
  ];

  return (
    <DashboardLayout>
      <div className="w-100 dashboard-container m-0 p-0">
        <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
    <CardUser 
        titre="Total des Dons" 
        icon="bi-cash-stack" 
        isUp={true} 
        percentage="20" 
        value="2500€" 
    />
</div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
    <CardUser 
        titre="Nombre de Contributions" 
        icon="bi-arrow-repeat" 
        isUp={true} 
        percentage="10" 
        value="15" 
    />
</div>
<div className="col-xl-3 col-sm-6 grid-margin stretch-card">
    <CardUser 
        titre="Projets Contribués" 
        icon="bi-folder-check" 
        isDown={true} 
        percentage="5" 
        value="7" 
    />
</div>
<div className="col-xl-3 col-sm-6 grid-margin stretch-card">
    <CardUser 
        titre="Niveau de fidélité" 
        icon="bi-award" 
        isUp={true} 
        percentage="++" 
        value="Or" 
    />
</div>
        </div>
      </div>
      <div className="w-100 dashboard-container">
        <h3 className="text-center secondary-color">Statistique</h3>
        <div className="container ">
          <DonationChart />
        </div>
      </div>
      <div className="w-100 mt-2">
      <AdminProjectsTable titre="Mes cinq recents projets contribués" projects={validProjects} />
      </div>
      <div className="w-100 mt-4">
        <h3 className="secondary-color text-center ">Liste de mes béneficiaire</h3>
        <UserTable users={users} />
      </div>
      <div className="w-100 d-flex flex-column mt-2">
        <h3 className="text-center secondary-color" >Rapport de mes projets contribués</h3>
      <div className="row row-cols-1 row-cols-md-3 mt-2 g-1">
        <div className="col ">
          <h3 className="secondary-color text-center">Titre Tule1</h3>
          <div className="row row-cols-2 row-cols-md-2 g-1">
            {rapportsData.map((rapport, index) => (
              <RapportCard key={index} rapport={rapport} />
            ))}
          </div>
        </div>
        <div className="col ">
          <h3 className="secondary-color text-center ">Titre Tule2</h3>
          <div className="row row-cols-2 row-cols-md-2 g-1">
            {rapportsData.map((rapport, index) => (
              <RapportCard key={index} rapport={rapport} />
            ))}
          </div>
        </div>
        <div className="col ">
          <h3 className="secondary-color text-center">Titre Tule3</h3>
          <div className="row row-cols-2 row-cols-md-2 g-1">
            {rapportsData.map((rapport, index) => (
              <RapportCard key={index} rapport={rapport} />
            ))}
          </div>
        </div>
      </div>
      </div>
     
    </DashboardLayout>
  );
};

export default DonorDashboard;
