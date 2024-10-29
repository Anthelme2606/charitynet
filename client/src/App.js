import React from 'react';
import AppRoute from './app/routes/route';
import { AppProvider } from './app/providers/AppProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ServerProvider from './lib/apollo-clinet';

const App = () => {
  return (
    <>
    <ToastContainer/>
      <AppRoute />
    </>
  );
};

const AppWrapper = () => (
  <ServerProvider>
 <AppProvider>
    <Router>
      
        <App />
   
    </Router>
  </AppProvider>
  </ServerProvider>
 
);

export default AppWrapper;
