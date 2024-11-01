import React from 'react';
import '../public/assets/css/components/adminProjects.css';
import {NavLink} from 'react-router-dom';

const AdminProjectsTable = ({ titre='', projects }) => {
  // Filtrer pour obtenir les projets non validés, les trier par date de création (la plus récente en premier) et obtenir les 5 premiers
  const recentInvalidProjects = projects
   // .filter((project) => project.isValid === false)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const statusText = (projet) => {
    if (projet) {
      switch (projet.statut) {
        case 'Pending':
          return 'attente...';
        case 'InProgress':
          return 'cours...';
        case 'Completed':
          return 'Terminé';
        default:
          return 'Inconnu';
      }
    }
  };
  const hideId = (id) => `project-${btoa(id)}`;

  return (
    <div className="admin-projects-table">
     {
  titre === '' || titre === null ? (
    <h1>Nouveaux projets</h1>
  ) : (
    <h1>{titre}</h1>
  )
}

      <table role="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Titre</th>
            <th scope="col">Résumé</th>
            <th scope="col">Statut</th>
            <th scope="col">Détails</th>
          </tr>
        </thead>
        <tbody>
          {recentInvalidProjects.map((project, index) => (
            <tr key={index}>
              <td>
                <img src={project?.image} alt={`Image du ${project?.titre}`} />
              </td>
              <td>{project?.titre}</td>
              <td>{project?.resume}</td>
              <td>
                <span
                  className={`status ${
                    project.statut === 'Pending'
                      ? 'status-pending'
                      : project.statut === 'InProgress'
                      ? 'status-in-progress'
                      : 'status-completed'
                  }`}
                >
                  {statusText(project)}
                </span>
              </td>
              <td>
              <NavLink to={`/project/${hideId(project?.id)}`} className="details-link link">
                  Détails
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjectsTable;
