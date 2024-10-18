import React, { useEffect, useState } from 'react';
import "../../public/assets/css/wallet.css";
import DashboardLayout from "../../layouts/dashboardLayout";

// Composant pour afficher un projet individuel
const ProjectRow = ({ projet }) => {
  const formatMontant = (montant) => {
    return montant >= 1000 ? `${(montant / 1000).toFixed(1)}k €` : `${montant.toLocaleString('fr-FR')} €`;
  };

  const calculerProgression = (collecte, objectif) => {
    return Math.min((collecte / objectif) * 100, 100).toFixed(0);
  };

  return (
    <tr>
      <td>
        <img src={projet.image} alt={projet.titre} width="50" height="50" />
      </td>
      <td>{projet.titre}</td>
      <td>{formatMontant(projet.objectif)}</td>
      <td>{formatMontant(projet.collecte)}</td>
      <td>
        <div className="progress-container">
          <div className="progress-bg">
            <div className="progress-bar" style={{ width: `${calculerProgression(projet.collecte, projet.objectif)}%` }}></div>
          </div>
          <span className="progress-percentage">{calculerProgression(projet.collecte, projet.objectif)}%</span>
        </div>
      </td>
    </tr>
  );
};

// Composant principal
const Wallet = () => {
  const [projets, setProjets] = useState([
    { id: "1", titre: "Projet Éducatif Local", image: "https://via.placeholder.com/50", objectif: 50000, collecte: 30000 },
    { id: "2", titre: "Jardin Communautaire", image: "https://via.placeholder.com/50", objectif: 15000, collecte: 18000 },
    { id: "3", titre: "Centre Culturel Polyvalent", image: "https://via.placeholder.com/50", objectif: 100000, collecte: 75000 },
    { id: "4", titre: "Rénovation Parc Municipal", image: "https://via.placeholder.com/50", objectif: 80000, collecte: 40000 }
  ]);

  const [totalCollecte, setTotalCollecte] = useState(0);

  useEffect(() => {
    const total = projets.reduce((acc, projet) => acc + projet.collecte, 0);
    setTotalCollecte(total);
  }, [projets]);

  const formatMontant = (montant) => {
    return montant >= 1000 ? `${(montant / 1000).toFixed(1)}k €` : `${montant.toLocaleString('fr-FR')} €`;
  };

  return (
    <DashboardLayout>
<div className="w-100 position-relative">
      <div className="total-collecte">
        <div className="text-xs">Total</div>
        <div className="total-montant">{formatMontant(totalCollecte)}</div>
      </div>

      <h1 className="title">Portefeuille de Projets</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Titre du Projet</th>
              <th>Objectif</th>
              <th>Collecté</th>
              <th>Progression</th>
            </tr>
          </thead>
          <tbody>
            {projets.map(projet => (
              <ProjectRow key={projet.id} projet={projet} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </DashboardLayout>
    
  );
};

export default Wallet;
