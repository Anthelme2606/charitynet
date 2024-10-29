import React from "react";
import "../public/assets/css/components/sidebar.css";
import { NavLink } from "react-router-dom";
import SidebarLinks from "../hooks/sidebarLinks";
import useIsMobile from "../hooks/mobileHook";

const Sidebar = () => {
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
      <aside className={`sidebar vh-100 ${isMobile ? 'd-none' : ''}`}>
        <div className="d-flex justify-content-between mb-2 mt-4">
          <span className="text-center app">
            Charity<span className="app-charity">Net</span>
          </span>
          <button className="mx-2 closer px-2 btn-outline-orange" onClick={closeSidebar}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <nav>
          <ul className="py-1">
            {links.map((link, index) => (
              <li className="link-item" key={index}>
                <NavLink
                  to={link.link}  
                  className={({ isActive }) =>
                    `nav-item d-flex rounded-lg align-items-center ${isActive ? 'link-active' : ''}`
                  }
                >
                  <span className="p-2">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
