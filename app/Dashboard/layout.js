"use client";
import ProtectedRoute from "../Auth/ProtectedRoute";

const Layout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default Layout;
