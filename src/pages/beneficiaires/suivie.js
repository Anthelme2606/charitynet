import React from "react";
import "../../public/assets/css/tracking.css";
import DashboardLayout from "../../layouts/dashboardLayout";
import Loader from '../../components/Loader';
import { useQuery } from "@apollo/client";
import { GET_ME_BENEFICIAIRE } from '../../lib/queries';

const getStatutColor = (statut) => {
  switch (statut) {
    case "Pending":
      return "status-en-attente";
    case "InProgress":
      return "status-en-cours";
    case "Completed":
      return "status-termine";
    default:
      return "";
  }
};
const getStatut = (statut) => {
  switch (statut) {
    case "Pending":
      return "En attente..";
    case "InProgress":
      return "En cours..";
    case "Completed":
      return "Terminé";
    default:
      return "";
  }
};


const InfoCard = ({ titre, valeur }) => (
  <div className="info-card">
    <h3>{titre}</h3>
    <p>{valeur}</p>
  </div>
);

const ProjectCard = ({ projet }) => (
  <div className="project-card">
    <div className="project-content">
      <img src={projet.image || "https://via.placeholder.com/50"} alt={projet.titre} className="project-image" />
      <div className="project-info">
        <h3 className="project-title">{projet.titre}</h3>
        <span className={`project-status ${getStatutColor(projet.statut)}`}>
          {getStatut(projet.statut)}
        </span>
      </div>
    </div>
  </div>
);

const ProjectTracking = () => {
  const { loading, error, data } = useQuery(GET_ME_BENEFICIAIRE,{
    fetchPolicy: "network-only", 
  });

  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;

  const infoCards = [
    { titre: "Projets actifs", valeur: data.getCurrentBeneficiaire.myProjets.length.toString() },
    { titre: "Bénéficiaires", valeur: "1500+" }, 
    { titre: "Fonds levés", valeur: "250K €" }, 
    { titre: "Partenaires", valeur: "12" }, 
  ];

  return (
    <DashboardLayout>
      <div className="w-100">
        <h1 className="title">Suivi de vos projets</h1>
        <p className="intro">
          Suivez le statut de vos projets et l'atteinte de votre objectif fixé.
        </p>

        <div className="info-cards">
          {infoCards.map((card, index) => (
            <InfoCard key={index} titre={card.titre} valeur={card.valeur} />
          ))}
        </div>

        <h2 className="subtitle">Vos projets</h2>
        <div className="projects-grid">
          {data.getCurrentBeneficiaire.myProjets.map((projet) => (
            <ProjectCard key={projet.id} projet={projet} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectTracking;
