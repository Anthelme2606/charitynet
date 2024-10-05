import React from 'react';
import { NavLink } from 'react-router-dom';
import  '../public/assets/css/footer.css';
const Footer =()=>{
    const currentYear = new Date().getFullYear();
   

    return (
    
 <footer className="w-100 m-0 p-0">
  <div className="container py-5">
    <div className="row">
      <div className="col-md-3 mb-4">
        <h3 className="h5 font-weight-bold">À propos de nous</h3>
        <p className="small">
          CharityNet est une application dédiée à la gestion des dons de bienfaisance. Nous facilitons la connexion entre les donateurs et les organisations caritatives, garantissant ainsi un impact positif sur les communautés.
        </p>
      </div>
      <div className="col-md-3 mb-4">
        <h3 className="h5 font-weight-bold">Liens rapides</h3>
        <ul className="list-unstyled">
          <li><NavLink href="/" className="text-decoration-none text-light hover:text-white">Accueil</NavLink></li>
          <li><NavLink href="/produits" className=" text-decoration-none text-light hover:text-white">Dons</NavLink></li>
          <li><NavLink href="/about" className="text-decoration-none text-light hover:text-white">À propos</NavLink></li>
          <li><NavLink href="/contact" className="text-decoration-none text-light hover:text-white">Contact</NavLink></li>
        </ul>
      </div>
      <div className="col-md-3 mb-4">
        <h3 className="h5 font-weight-bold">Services</h3>
        <ul className="list-unstyled">
          <li><NavLink href="/faq" className=" text-decoration-none text-light hover:text-white">Gestion des Dons</NavLink></li>
          <li><NavLink href="/shipping" className="text-decoration-none text-light hover:text-white">Suivi des Dons</NavLink></li>
          <li><NavLink href="/returns" className="text-decoration-none text-light hover:text-white">Rapports de Transparence</NavLink></li>
          <li><NavLink href="/privacy" className="text-decoration-none text-light hover:text-white">Éducation et Sensibilisation</NavLink></li>
        </ul>
      </div>
      <div className="col-md-3 mb-4">
        <h3 className="h5 font-weight-bold">Connectez-vous avec nous</h3>
        <div className="d-flex mb-3">
          <NavLink href="#" className="text-decoration-none text-light mx-2">
            <i className="bi bi-facebook"></i>
            <span className="sr-only">Facebook</span>
          </NavLink>
          <NavLink href="#" className="text-decoration-none text-light mx-2">
            <i className="bi bi-twitter"></i>
            <span className="sr-only">Twitter</span>
          </NavLink>
          <NavLink href="#" className="text-decoration-none text-light mx-2">
            <i className="bi bi-instagram"></i>
            <span className="sr-only">Instagram</span>
          </NavLink>
          <NavLink href="#" className="text-decoration-none text-light mx-2">
            <i className="bi bi-linkedin"></i>
            <span className="sr-only">LinkedIn</span>
          </NavLink>
        </div>
        <div>
          <NavLink href="mailto:contact@example.com" className="text-decoration-none small text-light">
            <i className="bi bi-envelope mr-2"></i>
            contact@example.com
          </NavLink>
        </div>
      </div>
    </div>
    <div className="mt-4 pt-4 border-top border-secondary text-center small">
      <p>&copy; {currentYear} CharityNet. Tous droits réservés.</p>
    </div>
  </div>
</footer> 



    );
}

export default Footer;