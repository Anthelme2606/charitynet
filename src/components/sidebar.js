import React, { useEffect } from "react";
import '../public/assets/css/components/sidebar.css';
import { NavLink, useLocation } from "react-router-dom";
// import Gift from "./Gift";
// import Section from "../partials/Section";

const Sidebar = ({ sidebarRef,closeToggler,isClosed, userManagementMenuRef, userManagementToggleRef, sidebarCloseRef }) => {
 
  const location = useLocation();
  
  const currentLink = location.pathname;

  useEffect(() => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach((link) => {

      if (link.getAttribute('href') === currentLink) {
        link.classList.add('sidebar-link-active');
      } else {
        link.classList.remove('sidebar-link-active'); 
      }
    });

   
    return () => {
      sidebarLinks.forEach((link) => {
        link.classList.remove('sidebar-link-active'); 
      });
    };
  }, [currentLink]); 


  return (
    <>
      <div ref={sidebarRef}  className={`sidebar ${isClosed?'closed':''}`} id="sidebar">

        <div className="">
          <button ref={sidebarCloseRef}
            id="sidebarClose" 
            className="btn  text-black position-absolute b0-o0 top-0 end-0 fs-20" 
           onClick={closeToggler}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <ul className="nav flex-column margin-top">
            <li className="nav-item">
             
              <NavLink to="/dashboard" className="sidebar-link ">
                <span className="icon bi bi-house"></span> 
                <span className="title">Dashboard</span>
            </NavLink>
             
            </li>

            <li className="nav-item">
            <NavLink to="/profil" className="sidebar-link">
                <span className="icon bi bi-person"></span> 
                <span className="title">Mon profil</span>
            </NavLink>
            </li>
         
            {/* <li className="nav-item ">
           
             <Section/>
            </li> */}
            
            <li className="nav-item">
            <NavLink to="/" className="sidebar-link">
                <span className="icon bi bi-envelope"></span> 
                <span className="title">Messages</span>
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/" className="sidebar-link">
                <span className="icon bi bi-star"></span> 
                <span className="title">Evaluations</span>
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/" className="sidebar-link">
                <span className="icon bi bi-file-earmark-text"></span> 
                <span className="title">Ressources</span>
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/" className="sidebar-link">
                <span className="icon bi bi-gear"></span> 
                <span className="title">Parametres</span>
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/" className="sidebar-link">
                <span className="icon bi bi-question-circle"></span> 
                <span className="title">Supports</span>
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/logout" className="sidebar-link">
                <span className="icon bi bi-box-arrow-right"></span> 
                <span className="title red">Deconnexion</span>
            </NavLink>
            </li>
            {/* <li className="nav-item m-0 p-0 w-100 ">
            <Gift/>
            </li> */}

           
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
