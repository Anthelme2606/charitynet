import React from "react";
import "../public/assets/css/components/sidebar.css";
import { NavLink } from "react-router-dom";
import SidebarLinks from "../hooks/sidebarLinks";
import useIsMobile from "../hooks/mobileHook";
import ROUTES  from '../app/routes/names';
import { useUser } from "../app/providers/AppProvider";
const Sidebar = () => {
  const { user } = useUser();
  const links = SidebarLinks();
  const { isMobile } = useIsMobile();

  const closeSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.remove('open');
      sidebar.classList.add('close');
    }
  };

  return (
    <>
      <aside className={`sidebar  ${isMobile ? 'd-none' : ''}`}>
      <div className="application">
        <h4>CharityNet</h4>
        <button className="mx-2 closer px-2 btn-outline-orange"  onClick={closeSidebar}>
        <i className="bi bi-x-lg"></i>
        </button>
    </div>
        
    
     <ul className="side-links py-1">
            {links.map((link, index) => (
              <li className="link-item" key={index}>
                <NavLink
                  to={link.link}  
                  className={({ isActive }) =>
                    `link a-link ${isActive ? 'link-active' : ''}`
                  }
                >
                  <span className="icon-circle">
                  <i class={`bi ${link.icon}`}></i></span>
                    {link.name}
                </NavLink>
              </li>
            ))}
    
</ul>

<div class="additional-links">
    <NavLink className="link a-link" to="#"><span className="icon-circle"><i className="bi bi-building"></i></span> Devenir un obnl</NavLink>
    <NavLink className="link a-link" to="#"><span className="icon-circle"><i className="bi bi-person-check"></i></span> Devenir un beneficiaire</NavLink>
    <NavLink className="link a-link" to="#"><span className="icon-circle"><i className="bi bi-cash-coin"></i></span> Devenir un donateur</NavLink>
    <p class="authenticated-text">Vous êtes connecté</p>
  </div>

  <div className="authenticator-info">
    <div className="user-init-name">
        <div className="user-initial">JD</div>
        <h4>{user?.username}</h4>
    </div>
   
    <p className="margin-4">
      {user?.email}
    </p>
    <p className="margin-4 text-center mx-4 px-4 bg-white">
      {user?.country}
    </p>
    <NavLink to={ROUTES.LOGOUT} className="link a-link logout">Déconnexion</NavLink>
  </div>
        
      </aside>
    </>
  );
};

export default Sidebar;
