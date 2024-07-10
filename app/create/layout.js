"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./layout.css";

const Layout = ({ children }) => {
  return <main>{children}</main>;
};

export default Layout;
