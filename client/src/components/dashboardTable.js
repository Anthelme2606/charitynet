import React from 'react';
import "../public/assets/css/components/dash-table.css";

const DashboardTable = () => {
  const projets = [
    {
      titre: "Projet 1",
      resume: "Ceci est un projet de développement durable visant à protéger l'environnement.",
    },
    {
      titre: "Projet 2",
      resume: "Un projet pour améliorer l'accès à l'éducation dans les zones rurales.",
    },
    {
      titre: "Projet 3",
      resume: "Initiative pour protéger les forêts en Afrique de l'Ouest.",
    },
  ];

  const utilisateurs = [
    {
      email: "user1@example.com",
      pays: "Togo",
    },
    {
      email: "user2@example.com",
      pays: "France",
    },
    {
      email: "user3@example.com",
      pays: "USA",
    },
  ];

  return (
    <div className="container">
      <h1>Nouveaux Projets Créés</h1>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Résumé</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((projet, index) => (
            <tr key={index}>
              <td data-label="Titre">{projet.titre}</td>
              <td data-label="Résumé">{projet.resume}</td>
              <td data-label="Détails">
                <a href="#" className="see-details">Voir Détails</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Utilisateurs: Bénéficiaires, Donateurs, OBNL</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Pays</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((utilisateur, index) => (
            <tr key={index}>
              <td data-label="Email">{utilisateur.email}</td>
              <td data-label="Pays">{utilisateur.pays}</td>
              <td data-label="Détails">
                <a href="#" className="see-details">Voir Détails</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
