import React, { useEffect, useState } from 'react';
import "../../public/assets/css/wallet.css";
import DashboardLayout from "../../layouts/dashboardLayout";
import Loader from '../../components/Loader';
import { useQuery } from "@apollo/client";
import { GET_ME_BENEFICIAIRE } from '../../lib/queries';

// Composant pour afficher un projet individuel
const ProjectRow = ({ projet }) => {
  const formatMontant = (montant) => {
    return montant >= 1000 ? `${(montant / 1000).toFixed(1)}k €` : `${montant.toLocaleString('fr-FR')} €`;
  };

  const calculerProgression = (collecte, objectif) => {
    return Math.min((collecte / objectif) * 100, 100).toFixed(0);
  };

  return (
    <>
<tr>
      <td>
        <img src={projet.image} className='img-wallet' alt={projet.titre} width="50" height="50" />
      </td>
      <td>{projet.titre}</td>
      <td>{formatMontant(projet.objectif)}</td>
      <td>{formatMontant(projet.collectes? projet.collectes:0)}</td>
      <td>
        <div className="progress-container">
          <div className="progress-bg">
            <div className="progress-bar" style={{ width: `${calculerProgression(projet.collectes? projet.collectes:0, projet.objectif)}%` }}></div>
          </div>
          <span className="progress-percentage">{calculerProgression(projet.collectes? projet.collectes:0, projet.objectif)}%</span>
        </div>
      </td>
    </tr>

    
    </>
    
  );
};

// Composant principal
// Composant principal
const Wallet = () => {
  const [totalCollecte, setTotalCollecte] = useState(0);

  const { loading, error, data } = useQuery(GET_ME_BENEFICIAIRE, {
    fetchPolicy: "network-only",
  });

  const projets = data?.getCurrentBeneficiaire?.myProjets || [];

  // Calcul du total collecté
  useEffect(() => {
    const total = projets.reduce((acc, projet) => acc + projet.collectes ? projet.collectes : 0, 0);
    setTotalCollecte(total);
  }, [projets]);

  const formatMontant = (montant) => {
    return montant >= 1000 ? `${(montant / 1000).toFixed(1)}k €` : `${montant.toLocaleString('fr-FR')} €`;
  };

  // Déplacez la fonction ici
  const calculerProgression = (collecte, objectif) => {
    return Math.min((collecte / objectif) * 100, 100).toFixed(0);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <DashboardLayout>
      <div className="w-100 position-relative">
        <div className="total-collecte">
          <div className="text-xs">Total</div>
          <div className="total-montant">{formatMontant(totalCollecte)}</div>
        </div>

        <h1 className="title text-left">Mon Portefeuille </h1>

        <div className="table-container margin-top">
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
    projet.isValid ? ( // Vérifiez si le projet est valide
      <ProjectRow key={projet.id} projet={projet} calculerProgression={calculerProgression} />
    ) : ''
  ))}
</tbody>

          </table>
        </div>

        {/* Ajouter la wallet-card ici si nécessaire */}
        {projets.map(projet => (
            projet.isValid ? 
         ( <div className="wallet-card " key={projet.id}>
            <img src={projet.image} alt={projet.titre} />
            <h2>{projet.titre}</h2>
            <p><strong>Objectif :</strong> {formatMontant(projet.objectif)}</p>
            <p><strong>Collecté :</strong> {formatMontant(projet.collectes ? projet.collectes : 0)}</p>
            <p><strong>Auteurs :</strong> {projet.auteurs}</p>
            <p><strong>Status :</strong> {projet.statut}</p>
            <div className="progress-container">
              <div className="progress-bg">
                <div className="progress-bar" style={{ width: `${calculerProgression(projet.collectes ? projet.collectes : 0, projet.objectif)}%` }}></div>
              </div>
              <span className="progress-percentage">{calculerProgression(projet.collectes ? projet.collectes : 0, projet.objectif)}%</span>
            </div>
          </div>):''
        ))}
      </div>
    </DashboardLayout>
  );
};


export default Wallet;
