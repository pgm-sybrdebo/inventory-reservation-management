import React from 'react'
import { base } from '../../interfaces'
import styled from "styled-components";

const Container : React.FC<base> = ({children}) => (
  <TheContainer>
    {children}
  </TheContainer>
)

const TheContainer = styled.div`
  margin: 0 auto;
  max-width: 100%;
  padding: 0 16px;
  @media(min-width:767px){
    padding: 0 64px;
  }
`;

export default Container
