import React from 'react'
import { MySingleSelectProps } from '../../interfaces'
import styled from "styled-components";


const Select : React.FC<MySingleSelectProps> = ({id, name,  onChange, onBlur}) => (
  <SelectField>
    <label htmlFor={id}>Status</label>
    <select id={id} name={name} onChange={onChange} onBlur={onBlur}>
      <option selected disabled>Choose Status</option>
      <option value={0}>Student</option>
      <option value ={1}> Staff</option>
    </select>
  </SelectField>
)

const SelectField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  & label{
    font-size: 18px;
    color: #2E3939;
    margin-bottom: .5rem;
    font-weight: 600;

  }
  & select{
    margin-bottom: .75rem;
    width: 100%;
    height:40px;
    padding: .5rem;
    outline: none;
    border: 2px solid #859593;
    border-radius: .25rem;

    & option{
      background-color:#859593 !important;
      color: white !important;
      border-radius: .25rem;
    }
  }
`
export default Select

