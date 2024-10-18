import React, { useState, useRef } from 'react';
import DashboardLayout from '../../layouts/dashboardLayout';
import '../../public/assets/css/projet-form.css';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { CREATE_PROJECT } from '../../lib/mutations';

const CreateProjectForm = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Reference for file input
  const fileInputRef = useRef(null);

  const [createProjet] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      toast.success('Projet créé avec succès!');
      resetForm(); // Reset the form fields
      setLoading(false); // Reset loading state
    },
    onError: (error) => {
      toast.error(`Erreur lors de la création du projet: ${error.message}`);
      setLoading(false); // Reset loading state on error
    },
  });

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setObjective('');
    setSelectedDomain(null);
    setImage(null);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const selectDomain = (domain) => {
    setSelectedDomain(domain);
  };
  const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !summary || !description || !objective || !selectedDomain) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('titre', title);
      formData.append('resume', summary);
      formData.append('description', description);
      formData.append('objectif', parseFloat(objective));
      formData.append('domaine',  normalizeString(selectedDomain));
      formData.append('dateDebut', startDate || '');
      formData.append('dateFin', endDate || '');

      if (image) {
        formData.append('image', image);
      }

      await createProjet({
        variables: {
          input: {
            titre: title,
            resume: summary,
            description: description,
            objectif: parseFloat(objective),
            domaine:  normalizeString(selectedDomain),
            dateDebut: startDate || '',
            dateFin: endDate || '',
          },
          image: image || undefined,
        },
      });
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <DashboardLayout>
      <div className="container">
        <h4>Crééz votre Projet</h4>
        <form onSubmit={handleSubmit}>
          {/* Project Title and Summary */}
          <div className="form-group">
            <label htmlFor="title">Titre du Projet</label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Titre du projet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="summary">Résumé de votre projet</label>
            <input
              type="text"
              id="summary"
              className="form-control"
              placeholder="Entrez un brief résumé"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          {/* Start Date and End Date */}
          <div className="input-group-two">
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="start-date">Date du Début</label>
                <input
                  type="date"
                  id="start-date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="end-date">Date de Fin</label>
                <input
                  type="date"
                  id="end-date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="form-group">
            <label htmlFor="description">Description du Project</label>
            <textarea
              id="description"
              className="form-control"
              rows="6"
              placeholder="Détaillez votre projet au moins 20 lignes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Project Objective */}
          <div className="form-group">
            <label htmlFor="objective">Objectif de votre projet (Somme en euro)</label>
            <input
              type="number"
              id="objective"
              className="form-control"
              placeholder="Entrez un nombre requis"
              min={1}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              required
            />
          </div>

          {/* Domain Selection */}
          <div className="form-group">
            <label>Choisissez le domaine de votre projet</label>
            <div className="domain-grid">
              {['Agriculture', 'Culturel', 'Education', 'Environnement', 'Financier', 'Infrastructure', 'Sante', 'Social', 'Sport', 'Technologie'].map((domain) => (
                <div className="col" key={domain}>
                  <div
                    className={`domain-choice ${selectedDomain === domain ? 'active' : ''}`}
                    onClick={() => selectDomain(domain)}
                  >
                    {domain}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="form-group">
            <label htmlFor="file">Téléversez une image ou fichier</label>
            <input
              type="file"
              id="file"
              className="form-control"
              onChange={handleFileChange}
              ref={fileInputRef} // Attach the reference here
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-submit text-center" disabled={loading}>
            {loading ? 'En cours...' : (
              <>
                <span className="bi bi-plus-circle text-white mx-2 fs-5"></span>
                Créez votre projet
              </>
            )}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateProjectForm;
