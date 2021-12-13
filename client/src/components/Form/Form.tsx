import React from 'react'
import { myForm } from '../../interfaces'


const Form : React.FC<myForm> = ({children, className}) => (
  <div className={className}>
    {children}
  </div>
)

export default Form
