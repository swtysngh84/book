import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const localStorageToken = localStorage.getItem("token");
  return localStorageToken ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
