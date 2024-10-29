import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import '../public/assets/css/project-list.css'; // Import custom CSS for additional styles

const ProjectList = () => {
  const projects = [
    {
      title: 'Protection de l\'environnement',
      description: 'Campagne de sensibilisation sur le recyclage',
      authors: 'Marie Dupont, Jean Martin',
      status: 'En cours',
    },
    {
      title: 'Éducation pour tous',
      description: 'Programme d\'alphabétisation dans les zones rurales',
      authors: 'Sophie Lefebvre',
      status: 'Planifié',
    },
    {
      title: 'Lutte contre la faim',
      description: 'Distribution de repas aux sans-abri',
      authors: 'Pierre Moreau, Lucie Girard',
      status: 'Terminé',
    },
  ];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Auteurs</th>
            <th>Status</th>
            <th>Détail</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.authors}</td>
              <td className="status">{project.status}</td>
              <td>
                <NavLink to='' className="detail-btn link">Voir</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
