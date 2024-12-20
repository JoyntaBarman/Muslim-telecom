import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";

import NotFound from "../pages/NotFound";
import Offer from "../pages/dashboard/offer";
import User from "../pages/dashboard/user/user";
import AddUser from "../pages/dashboard/user/AddUser";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        
        <Route index element={<Dashboard />} />
        <Route path="offer" element={<Offer />} />
        <Route path="user" element={<User />} />
        <Route path="user/add" element={<AddUser />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default HomeRoutes;
