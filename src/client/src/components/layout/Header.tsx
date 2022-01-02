import React from 'react'
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Container from './Container';
import * as routes from '../../routes';
import logo from "../../assets/logo.svg"
import more from "../../assets/more.svg"

const Header: React.FC = () => (
  <TheHeader>
    <Container>
      <div className="header__wrapper">
        <NavLink to={routes.LANDING}>
          <img src={logo} alt="logo artevelde" />
        </NavLink>
        <img src={more} alt="more icon" />
      </div>
    </Container>
  </TheHeader>
)

const TheHeader = styled.div`
  width: 100%;
  height: 90px;
  // margin-bottom: 32px;
  background-color: #F58732;
  & .header__wrapper{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Header