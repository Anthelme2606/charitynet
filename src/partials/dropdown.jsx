import React from 'react';
import {NavLink} from 'react-router-dom';
import '../public/assets/css/dropdown.css';
const Dropdown=()=>{
    return (
        <div className="dropdown-user">
        <button className="dropdown-toggle-user">
           <span className="bi bi-person person-icon"></span>
        </button>
        <div className="dropdown-menu">
            <div className="dropdown-header">
                John Doe
                <div className="dropdown-subtext">Vous êtes connecté</div>
            </div>
            <NavLink href="#" className="dropdown-item">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Ajouter un autre compte
            </NavLink>
            <NavLink href="#" className="dropdown-item">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Déconnexion
            </NavLink>
        </div>
    </div>
    );
}
export default Dropdown;