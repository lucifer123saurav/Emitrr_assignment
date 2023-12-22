import React from 'react';
import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f5f8fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
`;

const NavLink = styled.a`
  color: #000;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 10px;
  &:hover {
    background-color: #ddd;
  }
`;

export const NavBar = () => {
  return (
    <NavbarWrapper>
      <NavLink href="/profile">Profile</NavLink>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/logout">Logout</NavLink>
    </NavbarWrapper>
  );
};
