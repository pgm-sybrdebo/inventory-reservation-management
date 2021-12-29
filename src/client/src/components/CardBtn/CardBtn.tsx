import React from 'react'
import { MyButtonProps } from '../../interfaces'
import styled from "styled-components";

const CardBtn:React.FC<MyButtonProps> = ({text, type="button", name="", onClick}) => (
  <SmallBtn type={type} name={name} onClick={onClick}>
    {text}
  </SmallBtn>
)

const SmallBtn = styled.button`
  padding: 4px 8px;
  background-color:transparent;
  border: 2px solid #F58732;
  color: #F58732;
  font-size:14px;
  font-weight: 400;
  border-radius:.25rem;
  cursor:pointer;
  transition: all .2s ease-in-out;

  &:hover{
    background-color:#F58732;
    color:#fff;
  }
  white-space: nowrap;

`;

export default CardBtn
