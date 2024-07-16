"use client";

import React from "react";
import styled from "styled-components";

import { useRouter } from "next/navigation";
import { useAuth } from "./Auth/AuthContext";

export default function Nav() {
  const router = useRouter();
  const { signOut } = useAuth();
  const handleLogout = async () => {
    await signOut();
    router.push("/Auth/SignIn");
  };
  return (
    <NavContainer>
      <NavSection>
        <NavButton
          onClick={() => {
            router.push("/Dashboard");
          }}
        >
          Dashboard
        </NavButton>
        <NavButton>Create</NavButton>
        <NavButton>Analyze</NavButton>
      </NavSection>
      <NavSection>
        <NavButton
          onClick={() => {
            router.push("/UserSetting");
          }}
        >
          User Setting
        </NavButton>
        <NavButton onClick={handleLogout}>Log Out</NavButton>
      </NavSection>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #0070f3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }

  &:focus {
    outline: none;
  }
`;
