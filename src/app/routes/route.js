import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from '../../pages/home';
import Login from "../../pages/authentification/login";
import Dashboard from "../../pages/dashboard";

const AppRoute = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};
export default AppRoute;
