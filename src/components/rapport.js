import React, { useEffect, useState } from 'react';
import '../public/assets/css/components/rapport.css';
const rapportsData = [
  { nom: "Rapport Q1 2023", type: "pdf", url: "https://example.com/rapport1.pdf" },
  { nom: "Présentation Projet X", type: "docx", url: "https://example.com/presentation.docx" },
  { nom: "Analyse Financière", type: "pdf", url: "https://example.com/analyse.pdf" },
  { nom: "Plan Marketing 2023", type: "docx", url: "https://example.com/marketing.docx" },
];

const RapportCard = ({ rapport }) => {
  const getIconClass = (type) => (type === "pdf" ? "bi-file-earmark-pdf" : "bi-file-earmark-word");

  const voirRapport = (url) => {
    window.open(url, '_blank');
  };

  const telechargerRapport = (url) => {
    window.location.href = url;
  };

  const rejeterRapport = (nom) => {
    alert(`Le rapport "${nom}" a été rejeté.`);
  };

  const validerRapport = (nom) => {
    alert(`Le rapport "${nom}" a été validé.`);
  };

  return (
    <div className="col">
      <div className="card h-100 rapport-card">
        <div className="card-body rapport-card-body">
          <h5 className="card-title">
            <i className={`bi ${getIconClass(rapport.type)} me-2`}></i>
            {rapport.nom}
          </h5>
          <p className="card-text">Type: {rapport.type.toUpperCase()}</p>
          <div className="d-flex justify-content-between">
            <button className="btn rapport-primary btn-custom" onClick={() => voirRapport(rapport.url)}>
              <i className="bi bi-eye"></i> Voir
            </button>
            <button className="btn rapport-success btn-custom" onClick={() => telechargerRapport(rapport.url)}>
              <i className="bi bi-download"></i> Télécharger
            </button>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <button className="btn btn-danger btn-custom" onClick={() => rejeterRapport(rapport.nom)}>
              <i className="bi bi-x-circle"></i> Rejeter
            </button>
            <button className="btn rapport-valider btn-custom" onClick={() => validerRapport(rapport.nom)}>
              <i className="bi bi-check-circle"></i> Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RapportList = () => {
  const [rapports, setRapports] = useState([]);

  useEffect(() => {
    setRapports(rapportsData);
  }, []);

  return (
    <div className="W-100 m-0 P-0">
      <h1 className="mb-4 rapport-text">Liste des Rapports</h1>
      <div className="row row-cols-1 row-cols-md-3 g-1">
        {rapports.map((rapport, index) => (
          <RapportCard key={index} rapport={rapport} />
        ))}
      </div>
    </div>
  );
};

export default RapportList;
