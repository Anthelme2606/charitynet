import React, { useState } from 'react';
import '../public/assets/css/components/detailProject.css';
import { useMutation } from '@apollo/client';
import { VALID_PROJECT } from "../lib/mutations";
import Loader from "./Loader";
import { toast } from 'react-toastify';
import ConfirmPop from './confirmPop';

const DetailProject = ({ project }) => {
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const [isValid, setIsValid] = useState(project?.statut === "validé"); // Project validation status
    const [validProjet, { loading }] = useMutation(VALID_PROJECT, {
        onCompleted: (data) => {
            if (data.validProjet.isValid) {
                setIsValid(true); // Hide the validation button if project is validated
                toast.success("Le projet a été validé avec succès.");
            }
        },
        onError: (error) => {
            toast.error("Erreur lors de la validation du projet : " + error.message);
        },
    });

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    const handleValidate = () => {
        validProjet({ variables: { projetId: project.id } });
        closePopup();
    };

    return (
        <div className="w-100 m-0 p-0">
            <header className="project-header">
                <h1 className="project-title">{project?.titre}</h1>
                {!isValid && (
                    <button className="validate-button" onClick={openPopup} disabled={loading}>
                        {loading ? 'Validation...' : "Valider le projet"}
                    </button>
                )}
            </header>
            
            <img src={project?.image} alt="représentative du projet" className="img-fluid single-picture" />
            
            <div className="project-content d-flex flex-column">
                <p className="project-summary">{project?.resume}</p>
                
                <div className="project-description">
                    <h2>Description détaillée</h2>
                    <p>{project?.description}</p>
                </div>
                
                <div className="project-goal">
                    Objectif de financement : {project?.objectif} €
                </div>
                
                <div className="user-info-info-info">
                    <h3>À propos de l'auteur du projet</h3>
                    <p><strong>Email :</strong> {project?.beneficiaire?.user?.email}</p>
                    <p><strong>Pays :</strong> {project?.beneficiaire?.user?.country}</p>
                    <p><strong>Téléphone :</strong> {project?.beneficiaire?.phoneNumber}</p>
                </div>
            </div>

            {showPopup && (
                <ConfirmPop
                    message="Êtes-vous sûr de vouloir valider ce projet ?"
                    onConfirm={handleValidate}
                    onClose={closePopup}
                />
            )}
        </div>
    );
};

export default DetailProject;
