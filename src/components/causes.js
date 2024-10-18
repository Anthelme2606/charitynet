import React from 'react';
import '../public/assets/css/components/causes.css';
import { NavLink } from 'react-router-dom';
import Image1 from '../public/assets/images/c1.png';
import Image2 from '../public/assets/images/c2.png';
import Image3 from '../public/assets/images/c3.png';

const causesData = [
  {
    id: 1,
    image: Image1, // Use the image directly
    title: "Construction d'une École en Afrique",
    description: "Aidez-nous à construire une école pour les enfants dans les zones rurales en Afrique, afin de leur offrir une éducation de qualité.",
    progress: 70,
    target: "20 000€"
  },
  {
    id: 2,
    image: Image2, // Use the image directly
    title: "Accès à l'Eau Potable pour Tous",
    description: "Votre don peut fournir de l'eau potable à des milliers de familles dans des régions frappées par la sécheresse.",
    progress: 50,
    target: "10 000€"
  },
  {
    id: 3,
    image: Image3, // Use the image directly
    title: "Lutte contre la Faim en Inde",
    description: "Aidez-nous à nourrir des familles touchées par la pauvreté en Inde et à leur fournir des moyens de subsistance durables.",
    progress: 85,
    target: "15 000€"
  }
];

const Causes = () => {
  return (
    <div className="w-100 mt-1">
      <h2 className="section-title">Découvrir des Causes</h2>

      <div className="row mt-4">
        {causesData.map((cause) => (
          <div className="col-md-6 mb-4" key={cause.id}>
            <div className="card card-cause">
              <img src={cause.image} className="card-img-top" alt={`Cause Image ${cause.id}`} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{cause.title}</h5>
                <p className="card-text">{cause.description}</p>
                <div className="cause-progress mb-2">
                  <div
                    className="cause-progress-bar"
                    style={{ width: `${cause.progress}%`, backgroundColor: "#28a745" }} // Green progress bar
                  ></div>
                </div>
                <p className="progress-text">
                  {cause.progress}% financé - Objectif : {cause.target}
                </p>
                <div className="d-flex justify-content-between mt-auto">
                  <NavLink to="#" className="btn btn-view link">
                    Voir Plus
                  </NavLink>
                  <NavLink to="#" className="btn btn-donate link">
                    Contribuer
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Causes;
