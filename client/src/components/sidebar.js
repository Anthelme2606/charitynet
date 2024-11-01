import React from "react";
import "../public/assets/css/components/sidebar.css";
import { NavLink } from "react-router-dom";
import SidebarLinks from "../hooks/sidebarLinks";
import useIsMobile from "../hooks/mobileHook";
import ROUTES  from '../app/routes/names';
import { useUser } from "../app/providers/AppProvider";
const Sidebar = () => {
  const { user } = useUser();
  // console.log(user);
  const links = SidebarLinks();
  const { isMobile } = useIsMobile();

  const closeSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.remove('open');
      sidebar.classList.add('close');
    }
  };
  const TwoInitial = ({ username }) => {
    if (!username) return 'US';
  
    // Récupérer les deux premières lettres, mettre en majuscule
    const initials = username.slice(0, 2).toUpperCase();
    
    return initials;
  };
  const UserType=({userType})=>{
    if(!userType) return "Utilisateur";
    let userIs=null;
    switch(userType){
      case "Admin":
        userIs="Administrateur";
        break;
        case "User":
          userIs="Simple Utilisateur";
          break;
          case "Donor":
            userIs="Donateur";
            break;
            case "Beneficiary":
              userIs="Beneficiaire";
              break;
              default:
                userIs="Simple Utilisateur";
                break;

    }
    return userIs;
  }
  

  

  return (
    <>
      <aside className={`sidebar  ${isMobile ? 'd-none' : ''}`}>
      <div className="application">
        <div className=" d-flex justify-content-between">
        <h4>CharityNet</h4>
        <button className="mx-2 closer px-2 btn-outline-orange"  onClick={closeSidebar}>
        <i className="bi bi-x-lg"></i>
        </button>
        </div>
       
      <span className="badge text-success">
        <UserType userType={user?.auth?.userType}/>
      </span>
 
      
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
                  <i className={`bi ${link.icon}`}></i></span>
                    {link.name}
                </NavLink>
              </li>
            ))}
    
</ul>

<div className="additional-links">
    <NavLink className="link a-link" to="#"><span className="icon-circle"><i className="bi bi-building"></i></span> Devenir un obnl</NavLink>
    <NavLink className="link a-link" to="#"><span className="icon-circle"><i className="bi bi-person-check"></i></span> Devenir un beneficiaire</NavLink>
    <NavLink className="link a-link" to="#"><span className="icon-circle"><i className="bi bi-cash-coin"></i></span> Devenir un donateur</NavLink>
    <p className="authenticated-text">Vous êtes connecté</p>
  </div>

  <div className="authenticator-info">
    <div className="user-init-name">
        <div className="user-initial">
        <TwoInitial username={user?.auth?.username} />
        </div>
        <h4>{user?.auth?.username}</h4>
    </div>
   
    <p className="margin-4">
      {user?.auth?.email}
    </p>
    <p className="margin-4 text-center mx-4 px-4 bg-white">
      {user?.auth?.country}
    </p>
   
    <NavLink to={ROUTES.LOGOUT} className="link a-link logout">Déconnexion</NavLink>
  </div>
        
      </aside>
    </>
  );
};

export default Sidebar;
