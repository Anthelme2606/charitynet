import React, { useMemo, useEffect,useState,useRef } from "react";
import "../public/assets/css/components/navbar.css";
import charity from "../public/assets/images/charity.jpg";
import { NavLink } from "react-router-dom";
import useIsMobile from "../hooks/mobileHook.js";
import links from "../links/nav.links.js";
import useLinkIsActive from "../hooks/activelinkHook.js";
import useInput from "../hooks/inputHook.js";
import useHasSidebar from "../hooks/sidebarHook.js";
import useOpenSidebar from "../hooks/sidebarOpen.js";
import SidebarLinks from "../hooks/sidebarLinks";
import useSearchOpen from "../hooks/searchHook.js";
import ScrollToTop from "../hooks/useScroll.js";
import { BellFill, List, Search, PersonFill,X } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import ROUTES from '../app/routes/names';

const Navbar=()=> {
  ScrollToTop();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const token=Cookies.get('token');
  const { hasSidebar, isSidebarClosed } = useHasSidebar();
  const openSidebar = useOpenSidebar();
const links=SidebarLinks();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const offcanvasMenu = document.getElementById('offcanvasMenu');

    const handleShow = () => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0';
    };

    const handleHide = () => {
        document.body.style.overflow = ''; // Remettre à la valeur par défaut
        document.body.style.paddingRight = ''; // Remettre à la valeur par défaut
    };

    offcanvasMenu.addEventListener('show.bs.offcanvas', handleShow);
    offcanvasMenu.addEventListener('hide.bs.offcanvas', handleHide);

    // Cleanup listeners on unmount
    return () => {
        offcanvasMenu.removeEventListener('show.bs.offcanvas', handleShow);
        offcanvasMenu.removeEventListener('hide.bs.offcanvas', handleHide);
    };
}, []);


  const navlinks = token ? [
        { href: '#', label: 'Projets' },
        { href: '#', label: 'Services' },
       
      ]
    : [
      { href: '#', label: 'Projets' },
      { href: '#', label: 'Services' },
        { href:'/login', label: 'Se connecter' },
        { href: '/signup', label: 'Créer un compte' },
      ];

  return (
    <nav className="navbar shadow-md w-100">
      <div className="container-fluid px-4">
        <div className={`d-flex align-items-center justify-content-between ${isSearchOpen ? 'justify-content-end' : ''} h-16 w-100`}>
          {!isSearchOpen && (
            <div className="d-flex align-items-center">
              <NavLink to={ROUTES.HOME} className="navbar-brand fw-bold text-primary">
                <div className="">
                <img src={charity} className="logo" alt='charity'/>
                </div>
                
              </NavLink>
            </div>
          )}
          <div className="d-none d-md-block">
            <ul className="navbar-nav d-flex flex-row gap-4">
              {navlinks.map((link) => (
                <li key={link.label} className="nav-item">
                  <NavLink className="nav-link px-3 py-2" to={link.href}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-none d-md-flex align-items-center">
            <div className="position-relative">
              <input
                type="search"
                className="form-control me-2"
                placeholder="Rechercher..."
                style={{ width: '250px', paddingRight: '2.5rem' }}
              />
              <Search className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
            </div>
            {token && (
            <div className="d-flex">
              <button className="btn btn-outline-orange ms-2">
                <BellFill />
                <span className="visually-hidden">Notifications</span>
              </button>
              <button className={`btn sidebar-opener btn-outline-orange ms-2 ${isSidebarClosed? 'open':'d-none'}
                `}
                onClick={openSidebar}
                >
                <List />
                <span className="visually-hidden">Open</span>
              </button>
            </div>
          )}
          </div>
          <div className="d-flex d-md-none w-100 justify-content-end align-items-center">
            <div ref={searchRef} className={`position-relative flex-grow-1 me-2 ${isSearchOpen ? 'd-block' : 'd-none'}`}>
              <input
                type="search"
                className="form-control"
                placeholder="Rechercher..."
                autoFocus
              />
            </div>
            {!isSearchOpen && (
              <button className="btn btn-outline-orange me-2" onClick={() => setIsSearchOpen(true)}>
                <Search />
                <span className="visually-hidden">Recherche</span>
              </button>
            )}
            <button className="btn btn-outline-orange" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
              <List />
              <span className="visually-hidden">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Offcanvas Menu for Mobile */}
      <div className="offcanvas offcanvas-end bg-nav" tabIndex="-1" id="offcanvasMenu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
        <div className="offcanvas-body d-flex flex-column">
          <ul className="navbar-nav flex-grow-1">
            {navlinks.map((link,index) => (
              <li key={index} className="nav-item">
                <NavLink className="nav-link" href={link.href}>
                  {link.label}
                </NavLink>
              </li>
            ))}
              {links?.map((link,index) => (
              <li key={index} className="nav-item">
                <NavLink className="nav-link" to={link.link}>
                  {link.name}
                </NavLink>
              </li>
            ))}

          </ul>
          <div className="mt-auto">
            <button className="btn btn-outline-orange w-100 mb-2">
              <BellFill className="me-2" />
              Notifications
            </button>
            {/* <button className="btn btn-outline-orange w-100">
              <PersonFill className="me-2" />
              Profil
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
