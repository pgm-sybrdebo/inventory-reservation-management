import React from 'react'
import styled from "styled-components";

import {base} from '../../interfaces'
const GeneralList: React.FC<base> = ({children}) => (
  <MainList>
    {children}
  </MainList>
)

const MainList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export default GeneralList