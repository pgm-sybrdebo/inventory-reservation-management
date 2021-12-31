import React, {useEffect} from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import {useFormik, FormikProps} from 'formik';
import * as YUP from 'yup';
import styled from "styled-components";
import { MyRegisterFormValues } from '../../interfaces';
import Select from './Select';
import * as routes from '../../routes';

import { REGISTER } from '../../graphql/auth';
import { useMutation } from '@apollo/client';

import Input from '../Input/Input';
import StyledButton from '../Button/StyledButton.style';



const RegisterForm : React.FC = () => {
  const [register, { data, loading, error }] = useMutation(REGISTER);
  let navigate = useNavigate();

    useEffect(() => {
    if (data && !loading && !error) {

      console.log(data);
      navigate("/login");
    }
  }, [data, error, loading, navigate])
  const formik: FormikProps<MyRegisterFormValues> = useFormik<MyRegisterFormValues>({
    initialValues:{
      regFname: "",
      regLname:"",
      regEmail:"",
      regStatus:0,
      regNumber:"",
      regPass:"",
      repeatRegPass:"",
    },
    validationSchema: YUP.object({

      regFname:YUP.string()
      .min(2, "First Name must contain minimum 2 characters ")
      .max(30, "First Name must contain less than 30 characters ")
      .required("First Name is required"),
      
      
      regLname:YUP.string()
      .min(2, "Last Name must contain minimum 2 characters ")
      .max(30, "Last Name must contain less than 30 characters ")
      .required("Last Name is required"),
     
      regEmail: YUP.string().email("Inavalid email address ").required("Email is required"),
     
      regPass: YUP.string()
      .min(6, "Password must contain between 6 and 12 characters ")
      .max(12, "Password must contain between 6 and 12 characters")
      .required("Password is required"),
      repeatRegPass: YUP.string().oneOf([YUP.ref('regPass'), null], 'Passwords must match'),

      regStatus:  YUP.number().required("Profession is required"),
      regNumber: YUP.number()
      .required("Card number is required"),
     }),
    onSubmit:(values, {setSubmitting}) => {
      setSubmitting(true);
      console.log(values);
      register({
        variables: {
          email: values.regEmail,
          password: values.regPass,
          firstName: values.regFname,
          lastName: values.regLname,
          profession: values.regStatus,
          cardNumber: values.regNumber,
        }
      })
      setSubmitting(false);
    }
  });

  return (
    <RegSection>
      <div className="wrap">
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input 
            id="regFname"
            name="regFname"
            text="First Name" 
            type="text"  
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}
            value={formik.values.regFname}  
          />
          {formik.touched.regFname && formik.errors.regFname ? <p className="error">{formik.errors.regFname}</p> : null}
          <Input
            id="regLname" 
            name="regLname"  
            text="Last Name" 
            type="text" 
            onChange={formik.handleChange}
            onBlur = {formik.handleBlur} 
            value={formik.values.regLname}  
          />
          {formik.touched.regLname && formik.errors.regLname ? <p className="error">{formik.errors.regLname}</p> : null}
          <Input
            id="regEmail" 
            name="regEmail"  
            text="Email" 
            type="email" 
            
            onChange={formik.handleChange}
            onBlur = {formik.handleBlur} 
            value={formik.values.regEmail}  
          />
          {formik.touched.regEmail && formik.errors.regEmail ? <p className="error">{formik.errors.regEmail}</p> : null}
          <Select
            id="regStatus" 
            name="regStatus"  
            onChange={formik.handleChange}
            onBlur = {formik.handleBlur} 
            value={formik.values.regStatus}  
          />
          {formik.touched.regStatus && formik.errors.regStatus ? <p className="error">{formik.errors.regStatus}</p> : null}
          <Input 
            id="regNumber"
            name="regNumber"
            text="Card Number" 
            type="text"  
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}
            value={formik.values.regNumber}  
          />
          {formik.touched.regNumber && formik.errors.regNumber ? <p className="error">{formik.errors.regNumber}</p> : null}
          <Input 
            id="regPass"
            name="regPass"
            text="Password" 
            type="password"  
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}
            value={formik.values.regPass}  
          />
          {formik.touched.regPass && formik.errors.regPass ? <p className="error">{formik.errors.regPass}</p> : null}
          <Input
            id="repeatRegPass" 
            name="repeatRegPass"  
            text="Repeat password" 
            type="password" 
            onChange={formik.handleChange}
            onBlur = {formik.handleBlur} 
            value={formik.values.repeatRegPass}  
          />
          {formik.touched.repeatRegPass && formik.errors.repeatRegPass ? <p className="error">{formik.errors.repeatRegPass}</p> : null}
          <StyledButton 
            type="submit" 
            text="Create Account" 
            name="createAccount"
            color="white"
            width="100%"
            backgroundcolor="#F58732"
            radius = ".25rem"
          />
          <p className="switch">Already have an account? <NavLink to ={routes.LOGIN}>Login</NavLink></p>
        </form>

    </div>
  </RegSection>
  )
}

const RegSection = styled.div`
  height: 100vh;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & form{
    width: 100%;
    & button{
      margin-top: 1.5rem !important;
    }
  }
  & div{
    margin: 0;
    padding: 0;
    width: 100%;
    & h2{
      font-size: 1.8rem !important;
      font-weight: 600;
      color:#000;
      margin-bottom:1rem ;
    }
  }
`;

export default RegisterForm;
