import React, { useEffect } from 'react';
import Footer from '../partials/footer';
import Navbar from '../components/navbar';

const PageLayout = ({ pageTitle, children }) => {
  useEffect(() => {
    document.title = 'CharityNet | ' + pageTitle;
  }, [pageTitle]);

  return (
    <>
      <div className="w-100 m-0 p-0 global-container overflow-hidden">
       
        <Navbar />
      
       
        <div className="w-100 m-0 p-0">
          {children}
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default PageLayout;
