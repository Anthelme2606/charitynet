import React from 'react';
import '../public/assets/css/components/table.css';

const Table = ({ projects }) => {

    const statusColor = (projet) => {
        if (projet) {
            switch (projet.statut) {
                case 'Pending':
                    return 'warning'; 
                case 'InProgress':
                    return 'primary'; 
                case 'Completed':
                    return 'success'; 
                default:
                    return 'secondary'; 
            }
        }
    };

    const statusText = (projet) => {
        if (projet) {
            switch (projet.statut) {
                case 'Pending':
                    return 'En attente...'; 
                case 'InProgress':
                    return 'En cours...'; 
                case 'Completed':
                    return 'Terminé'; 
                default:
                    return 'Inconnu'; 
            }
        }
    };

    const stateColor = (projet) => {
        if (projet) {
            return projet.isValid ? 'success' : 'danger'; // Utilisation de Bootstrap (bg-success ou bg-danger)
        }
    };

    const stateText = (projet) => {
        return projet && projet.isValid ? 'Validé' : 'Non validé';
    };

    return (
        <div className="w-100">
            <h2 className="text-center mb-4">Liste des Projets</h2>

            {/* Table for larger screens */}
            <div className="table-responsive">
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th scope="col">Titre</th>
                            <th scope="col">Description</th>
                            <th scope="col">Statut</th>
                            <th scope="col">État</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={index}>
                                <td>{project.titre}</td>
                                <td>{project.description}</td>
                                <td><span className={`badge bg-${statusColor(project)}`}>{statusText(project)}</span></td>
                                <td><span className={`badge bg-${stateColor(project)}`}>{stateText(project)}</span></td>
                                <td>
                                    {/* <button className="btn btn-outline-primary btn-sm"><i className="bi bi-play-fill"></i></button>
                                    <button className="btn btn-outline-warning btn-sm"><i className="bi bi-x-circle-fill"></i></button> */}
                                    <button className="btn btn-outline-info btn-sm"><i className="bi bi-eye"></i></button>
                                    <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-pencil-fill"></i></button>
                                    <button className="btn btn-outline-danger btn-sm"><i className="bi bi-trash-fill"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards for mobile screens */}
            <div className="d-md-none">
                {projects.map((project, index) => (
                    <div className="card tcard mb-3" key={index}>
                        <div className="card-body tcard-body">
                            <h5 className="card-titre">{project.titre}</h5>
                            <p className="card-text">{project.description}</p>
                            
                            <span className={`badge bg-${statusColor(project)}`}>{statusText(project)}</span>
                            <span className={`badge bg-${stateColor(project)}`}>{stateText(project)}</span>
                            <div className="card-actions mt-3">
                                <button className="btn btn-outline-primary"><i className="bi bi-play-fill"></i></button>
                                <button className="btn btn-outline-warning"><i className="bi bi-x-circle-fill"></i></button>
                                <button className="btn btn-outline-info"><i className="bi bi-eye"></i></button>
                                <button className="btn btn-outline-secondary"><i className="bi bi-pencil-fill"></i></button>
                                <button className="btn btn-outline-danger"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;
