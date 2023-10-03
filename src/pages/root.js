import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar";

function Root() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
