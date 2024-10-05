import React from 'react';
import AppRoute from './app/routes/route';
import { AppProvider } from './app/providers/AppProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <>
    <ToastContainer/>
      <AppRoute />
    </>
  );
};

const AppWrapper = () => (
  <AppProvider>
    <Router>
      
        <App />
   
    </Router>
  </AppProvider>
);

export default AppWrapper;
