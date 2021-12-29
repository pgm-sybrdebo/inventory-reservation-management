import React from 'react';
import { MyInputFormProps } from '../../interfaces';
import styled from "styled-components";

const Input : React.FC<MyInputFormProps> = ({text, type, id, name, onChange=null, onBlur=null, value}) => (
  <FormInput>
      <label htmlFor={id}>{text}</label>
      <input type={type} id={id} name={name} onChange={onChange} onBlur={onBlur} value={value} />
  </FormInput>
)

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  & label{
    font-size: 18px;
    color: #2E3939;
    margin-bottom: .5rem;
    font-weight: 600;

  }
  & input{
    margin-bottom: .75rem;
    width: 100%;
    height:40px;
    padding: .5rem;
    outline: none;
    border: 2px solid #859593 ;
    border-radius: .25rem;
  }
`;

export default Input
