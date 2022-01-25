import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MenuItemProps } from "../../interfaces";
//import * as routes from '../../routes';

const MenuItemComponent = styled.li`
  margin-bottom: 1rem;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  margin-left: 0.5rem;
  font-size: 1.5rem;
`;
const SubMenuList = styled.ul`
  list-style: none;
  padding: 0.5rem;

  li {
    padding: 0.5rem;
    color: #000;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;

    span {
      margin-left: 0.5rem;
    }

    &:hover,
    &.active {
      background-color: #cbbec5;
    }
  }
`;

const MenuItem = ({ title, submenu, icon }: MenuItemProps) => {
  return (
    <MenuItemComponent>
      <Container>
        {icon}
        <Title>{title}</Title>
      </Container>
      <SubMenuList>
        {submenu.map((submenuItem, index) => {
          const url = submenuItem.url;
          return (
            <NavLink to={url}>
              <li key={index}>
                {submenuItem.icon}
                <span>{submenuItem.name}</span>
              </li>
            </NavLink>
          );
        })}
      </SubMenuList>
    </MenuItemComponent>
  );
};

export default MenuItem;
