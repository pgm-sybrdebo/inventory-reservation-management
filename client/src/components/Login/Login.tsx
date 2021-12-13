import React from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import {useFormik, FormikProps} from 'formik';
import * as YUP from 'yup';
import { MyLoginFormValues, myRegProps } from '../../interfaces';
import * as routes from '../../routes';

import StyledInput from '../Input/StyledInput.style';
import StyledButton from '../Button/StyledButton.style';

const Login: React.FC<myRegProps> = ({className}) => {
  let navigate = useNavigate();

  const formik: FormikProps<MyLoginFormValues> = useFormik<MyLoginFormValues>({
    initialValues:{
      loginEmail: "",
      loginPass:"",
    },
    validationSchema: YUP.object({
      loginEmail: YUP.string().email("Inavalid email address ").required("Email is required"),
      loginPass: YUP.string().min(6, "Password must contain between 6 and 12 characters ").max(12, "Password must contain between 6 and 12 characters").required("Password is required")
    }),
    onSubmit: (values) => {
      console.log(values);
      navigate("/");
    },
  });
  return (
    <div className={className}>
      <div className="wrap">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <StyledInput 
            id="email"
            name="loginEmail"
            text="Email" 
            type="email"  
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}
            value={formik.values.loginEmail}  
          />
          {formik.touched.loginEmail && formik.errors.loginEmail ? <p className="error">{formik.errors.loginEmail}</p> : null}
          <StyledInput
            id="password" 
            name="loginPass"  
            text="Password" 
            type="password" 
            onChange={formik.handleChange}
            onBlur = {formik.handleBlur} 
            value={formik.values.loginPass}  
          />
          
          {formik.touched.loginPass && formik.errors.loginPass ? <p className="error">{formik.errors.loginPass}</p> : null}
          <StyledButton 
            type="submit" 
            text="Login" 
            name="login"
            color="white"
            width="100%"
            backgroundcolor="#F58732"
          />
        </form>
        <p className="switch">Don't have an account yet? <NavLink to ={routes.REGISTER}>Register</NavLink></p>
      </div>


  </div>

  )
}

export default Login;
