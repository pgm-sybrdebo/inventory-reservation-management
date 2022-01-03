import React from 'react'
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Container from './Container';
import * as routes from '../../routes';
import logo from "../../assets/logo.svg"
import more from "../../assets/more.svg"

interface HeaderProps {
  type?: string
}


interface StyledProps {
  t: string;
}

const Header = ({type="base"}:HeaderProps) => (
  <TheHeader t={type}>
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

const TheHeader = styled.div<StyledProps>`
  width: 100%;
  height: 90px;
  margin-bottom: ${props => props.t === 'dashboard' ? '0px' : '32px'};
  position: ${props => props.t === 'dashboard' ? 'sticky' : 'static'};
  top: 0;
  background-color: #F58732;
  & .header__wrapper{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Header