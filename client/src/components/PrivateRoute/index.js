import React from 'react'
import { Route, Redirect } from "react-router-dom";
import * as Routes from '../../routes';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return (
    <Route {...rest} render={(props) =>{
      if(token) return <Component {...props} />
      if(!token) return <Redirect to ={Routes.LOGIN} />
    }}/>
      
  )
}

export default PrivateRoute; 