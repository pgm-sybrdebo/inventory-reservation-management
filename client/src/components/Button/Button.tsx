import React from 'react'
import { MyButtonProps } from '../../interfaces'

const Button:React.FC<MyButtonProps> = ({className, text, type="button", name="", onClick}) => (
  <button className={className} type={type} name={name} onClick={onClick}>
    {text}
  </button>
)

export default Button
