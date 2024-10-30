import React from "react";
import DashboardLayout from "../../layouts/dashboardLayout";
import Card from "../../components/Card";
import CardUser from "../../components/CardUser";
import LineGraph from "../../components/LineGraph";
import RapportCard from "../../components/RapportCard";
import UserTable from "../../components/UserTable";

const DonorDashboard = () => {
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
    
        <CardUser 
            titre="Dons" 
            icon="bi-arrow-up-left" 
            isUp={true} 
            percentage={`${50}`} 
            value={`2500€`}
        />
         
         <CardUser 
            titre="Dons" 
            icon="bi-arrow-up-left" 
            isUp={true} 
            percentage={`${50}`} 
            value={`2500€`}
        />
          
          <CardUser 
            titre="Dons" 
            icon="bi-arrow-up-left" 
            isUp={true} 
            percentage={`${50}`} 
            value={`2500€`}
        />
        </div>
      </div>
      <div className="w-100 dashboard-container mt-2 p-4">
        <h2>Statistique</h2>
        <div className="container d-flex  justify-content-center align-items-center">
          <LineGraph />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-2">
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
      <div className="w-100 mt-4">
        <h1 className="secondary-color ">Liste Des Beneficiaire</h1>
        <UserTable users={users} />
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;
