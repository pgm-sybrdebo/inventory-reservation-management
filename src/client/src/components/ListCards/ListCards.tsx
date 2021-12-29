import React from 'react'
import styled from "styled-components";
import { base } from '../../interfaces'
const ListCards : React.FC<base> = ({children}) => (
  <List>
    {children}
  </List>
)

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom:32px;
`;

export default ListCards
