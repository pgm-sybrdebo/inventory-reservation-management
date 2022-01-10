import React, { useState } from 'react'
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Container from './Container';
import * as routes from '../../routes';
import logo from "../../assets/logo.svg"
import more from "../../assets/more.svg"
import { HeaderProps } from '../../interfaces';
import SideNavMenu from './SideNavMenu';
interface StyledProps {
  t: string;
}

const Header = ({type="base"}:HeaderProps) => {

  const [modalVisible, setModalVisible] = useState(false);
  console.log(modalVisible);
  return(
    <>
      <TheHeader t={type}>
        <Container>
          <div className="header__wrapper">
            <NavLink to={routes.LANDING}>
              <img src={logo} alt="logo artevelde" />
            </NavLink>
            <img src={more} alt="more icon" onClick={()=> setModalVisible(true)} />
          </div>
        </Container>
      </TheHeader>
      {modalVisible  && <SideNavMenu setModalVisible={setModalVisible}/>}
    </>
  );
}


const TheHeader = styled.div<StyledProps>`
  width: 100%;
  height: 90px;
  /* margin-bottom: ${props => props.t === 'dashboard' ? '0px' : '32px'};
  position: ${props => props.t === 'dashboard' ? 'sticky' : 'static'}; */
  margin-bottom:0px;
  position: sticky;
  top: 0;
  z-index:10;
  background-color: #F58732;
  & .header__wrapper{
    display:flex;
    justify-content: space-between;
    align-items: center;
    & img{
      cursor: pointer !important;
    }
  }
`;

export default Header