import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ScrollRestoration } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
