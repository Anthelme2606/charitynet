import React, { useEffect } from 'react';

const AuthLayout = ({ pageTitle, children }) => {
  useEffect(() => {
    document.title = 'CharityNet | ' + pageTitle;
  }, [pageTitle]);

  return (

      <div className="w-100 m-0 p-0 layout overflow-x-hidden">
       
       
      
       
        <div className="w-100 m-0 p-0">
          {children}
        </div>
      
      </div>
    
  );
}

export default AuthLayout;
