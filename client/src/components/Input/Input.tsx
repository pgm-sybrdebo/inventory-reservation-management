import React from 'react';
import { MyInputFormProps } from '../../interfaces';

const Input : React.FC<MyInputFormProps> = ({className, text, type, id, name, onChange=null, onBlur=null, value}) => (
  <div className={className}>
      <label htmlFor={id}>{text}</label>
      <input type={type} id={id} name={name} onChange={onChange} onBlur={onBlur} value={value} />
  </div>
)


export default Input
