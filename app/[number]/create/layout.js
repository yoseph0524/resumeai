"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./layout.css";
import Nav from "../../nav";
import styled from "styled-components";
import React from "react";

const Layout = ({ children }) => {
  return (
    <Container>
      <Nav />
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  height: 100vh;
`;

const Content = styled.div`
  padding: 0px;
  overflow-y: auto;
`;
