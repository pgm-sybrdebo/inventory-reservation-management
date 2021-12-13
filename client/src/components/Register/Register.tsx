import React from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import {useFormik, FormikProps} from 'formik';
import * as YUP from 'yup';
import { MyRegisterFormValues, myRegProps } from '../../interfaces';
import Select from './Select';
import * as routes from '../../routes';



import StyledInput from '../Input/StyledInput.style';
import StyledButton from '../Button/StyledButton.style';



const Register : React.FC<myRegProps> = ({className}) => {
  let navigate = useNavigate();
  const formik: FormikProps<MyRegisterFormValues> = useFormik<MyRegisterFormValues>({
    initialValues:{
      regFname: "",
      regLname:"",
      regEmail:"",
      regStatus:"",
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

      regStatus:  YUP.string().required("Status is required"),
      regNumber: YUP.string()
      .required("Card number is required"),
     }),
    onSubmit: (values) => {
      console.log(values);
      navigate("/login");
    },
  });

  return (
    <div className={className}>
      <div className="wrap">
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <StyledInput 
            id="regFname"
            name="regFname"
            text="First Name" 
            type="text"  
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}
            value={formik.values.regFname}  
          />
          {formik.touched.regFname && formik.errors.regFname ? <p className="error">{formik.errors.regFname}</p> : null}
          <StyledInput
            id="regLname" 
            name="regLname"  
            text="Last Name" 
            type="text" 
            onChange={formik.handleChange}
            onBlur = {formik.handleBlur} 
            value={formik.values.regLname}  
          />
          {formik.touched.regLname && formik.errors.regLname ? <p className="error">{formik.errors.regLname}</p> : null}
          <StyledInput
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
          <StyledInput 
            id="regNumber"
            name="regNumber"
            text="Card Number" 
            type="text"  
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}
            value={formik.values.regNumber}  
          />
          {formik.touched.regNumber && formik.errors.regNumber ? <p className="error">{formik.errors.regNumber}</p> : null}
          <StyledInput 
            id="regPass"
            name="regPass"
            text="Password" 
            type="password"  
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}
            value={formik.values.regPass}  
          />
          {formik.touched.regPass && formik.errors.regPass ? <p className="error">{formik.errors.regPass}</p> : null}
          <StyledInput
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
          />
          <p className="switch">Already have an account? <NavLink to ={routes.LOGIN}>Login</NavLink></p>
        </form>

    </div>
  </div>
  )
}

export default Register;
