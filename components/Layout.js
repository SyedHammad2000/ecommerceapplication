import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Toaster position=" bottom-center"/>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
