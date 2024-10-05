// src/components/DashboardLayout.js
import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

const DashboardLayout = ({ children, sidebarRef, sidebarToggleRef, isSmallScreen, closeToggler, isClosed }) => {
  return (
    <>
      <Navbar 
        sidebarToggleRef={sidebarToggleRef} 
        isSmallScreen={isSmallScreen}
        closeToggler={closeToggler}
        isClosed={isClosed} 
      />
      <Sidebar
        sidebarRef={sidebarRef}
        isClosed={isClosed}
        closeToggler={closeToggler}
      />
      <main className={`main-content main-top-12 ${isClosed ? 'sidebar-closed' : ''}`} id="mainContent">
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
