import React, { useMemo, useEffect } from "react";
import "../public/assets/css/components/navbar.css";
import charity from "../public/assets/images/charity.jpg";
import { NavLink } from "react-router-dom";
import useIsMobile from "../hooks/mobileHook.js";
import links from "../links/nav.links.js";
import useLinkIsActive from "../hooks/activelinkHook.js";
import useInput from "../hooks/inputHook.js";
import useHasSidebar from "../hooks/sidebarHook.js";
import Search from "./recherches.js";
import useSearchOpen from "../hooks/searchHook.js";

const Navbar = ({
  sidebarToggleRef,
  isClosed,
  closeToggler,
  isSmallScreen,
}) => {
  const { isSearchOpen, openSearch, closeSearch } = useSearchOpen();
  const hasSidebar = useHasSidebar();
  const isMobile = useIsMobile();
  const [hasValue, inputValue, onInputChange] = useInput("");
  const checkActiveLinks = useLinkIsActive("unique-link"); // Adjust the class name accordingly

  useEffect(() => {
    checkActiveLinks();
  }, [checkActiveLinks]);
  const truncate = ({ text, size = 15 }) => {
    return text && text.length > size
      ? `${text.substring(0, size)}...`
      : text || "";
  };

  const placeholderText = useMemo(
    () =>
      truncate({
        text: "Rechercher une entreprise bénéficiaire ou donateur..",
        size: 30,
      }),
    []
  );

  return (
    <nav className="navbar navbar-expand-lg  w-100 m-0 p-0">
      <div className="container-fluid">
        
         <NavLink to="/" className="navbar-brand">
          <img src={charity} className="img-fluid logo" alt="CharityNet logo" />
        </NavLink>
        {
          isMobile && (<Search/>)
        }
       
        {hasSidebar && isMobile ? (
          <button
            ref={sidebarToggleRef}
            onClick={closeToggler}
            id="sidebarToggle"
            type="button"
            className={` mx-4 bgV-cW fw-30 ${
              isClosed ? "d-none" : ""
            } hamburger`}
          >
            <i className="bi bi-list"></i>
          </button>
        ) : (
          <button
            ref={sidebarToggleRef}
            onClick={closeToggler}
            id="sidebarToggle"
            className={`mx-4 bgV-cW fw-30 ${
              isClosed ? "" : "d-none"
            }  hamburger`}
          >
            <i className="bi bi-list"></i>
          </button>
        )}
        
        {!hasSidebar && (
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i
              className="bi bi-list "
              style={{ color: "white", fontSize: "40px" }}
            ></i>
          </button>
        )}

        <div className="collapse navbar-collapse" id="navbarNav">
          {!isMobile && <div className="search-container position-relative me-3">
            <span className={`vh ${hasValue ? "d-none" : "d-block"}`}></span>
            <i
              className={`bi bi-geo-alt zone-icon ${
                hasValue ? "d-none" : "d-block"
              } `}
            ></i>
            <input
              value={inputValue}
              onInput={onInputChange}
              className={`form-control me-2 ${isMobile ? "" : "search-input"}`}
              type="search"
              placeholder={placeholderText}
            />
          </div>}
          <ul className="navbar-nav">
            {links &&
              !hasSidebar &&
              links.unauth.map((unauth, index) => (
                <li className="nav-item" key={index}>
                  <NavLink to={unauth.link} className={`nav-link unique-link`}>
                    {unauth.title}
                  </NavLink>
                </li>
              ))}
            {hasSidebar && (
              <li className="nav-item">
                <div className="auth">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M18 20a6 6 0 0 0-12 0" />
                    <circle cx="12" cy="10" r="4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
