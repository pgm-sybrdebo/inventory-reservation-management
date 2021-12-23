// import React from 'react'
// import { useNavigate, NavLink } from "react-router-dom";
// import {useFormik, FormikProps} from 'formik';
// import * as YUP from 'yup';
// import styled from "styled-components";
// import { MyLoginFormValues } from '../../interfaces';
// import * as routes from '../../routes';

// import Input from '../Input/Input';
// import StyledButton from '../Button/StyledButton.style';
// import { LOGIN } from '../../graphql/auth';
// import { useMutation } from '@apollo/client';

// const LoginForm: React.FC = () => {
//   const [login, { data, loading, error }] = useMutation(LOGIN);
//   let navigate = useNavigate();

//   useEffect(() => {
//     if (data) {

//       console.log(data);
//       localStorage.setItem("token", data.login.access_token);
//       navigate("/");
//     }
//   }, [data])

//   const formik: FormikProps<MyLoginFormValues> = useFormik<MyLoginFormValues>({
//     initialValues:{
//       loginEmail: "",
//       loginPass:"",
//     },
//     validationSchema: YUP.object({
//       loginEmail: YUP.string().email("Inavalid email address ").required("Email is required"),
//       loginPass: YUP.string().min(6, "Password must contain between 6 and 12 characters ").max(12, "Password must contain between 6 and 12 characters").required("Password is required")
//     }),

//     onSubmit:(values, {setSubmitting}) => {
//       setSubmitting(true);

//       login({
//         variables: {
//           email: values.loginEmail,
//           password: values.loginPass,
//         }
//       })
//       setSubmitting(false);
//     }
//   })

//   return (
//     <LogSection>
//       <div className="wrap">
//         <h2>Login</h2>
//         <form onSubmit={formik.handleSubmit}>
//           <Input 
//             id="email"
//             name="loginEmail"
//             text="Email" 
//             type="email"  
//             onChange={formik.handleChange} 
//             onBlur = {formik.handleBlur}
//             value={formik.values.loginEmail}  
//           />
//           {formik.touched.loginEmail && formik.errors.loginEmail ? <p className="error">{formik.errors.loginEmail}</p> : null}
//           <Input
//             id="password" 
//             name="loginPass"  
//             text="Password" 
//             type="password" 
//             onChange={formik.handleChange}
//             onBlur = {formik.handleBlur} 
//             value={formik.values.loginPass}  
//           />
          
//           {formik.touched.loginPass && formik.errors.loginPass ? <p className="error">{formik.errors.loginPass}</p> : null}
//           {error && <p>Wrong email or password!</p>}
//           <StyledButton 
//             type="submit" 
//             text="Login" 
//             name="login"
//             color="white"
//             width="100%"
//             backgroundcolor="#F58732"
//             radius=".25rem"
//           />
//         </form>
//         <p className="switch">Don't have an account yet? <NavLink to ={routes.REGISTER}>Register</NavLink></p>
//       </div>


//   </LogSection>

//   )
// }
// const LogSection = styled.div`
//   height: 100vh;
//   padding: 1.5rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   & form{
//     width: 100%;
//     & button{
//       margin-top: 1.5rem !important;
//     }
//   }
//   & div{
//     margin: 0;
//     padding: 0;
//     width: 100%;
//     & h2{
//       font-size: 1.8rem !important;
//       font-weight: 600;
//       color:#000;
//     }
//   }
// `;

// export default LoginForm;



import React, { useEffect } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import { Formik } from 'formik';
import * as YUP from 'yup';
import styled from "styled-components";
//import { MyLoginFormValues } from '../../interfaces';
import * as routes from '../../routes';

import Input from '../Input/Input';
import StyledButton from '../Button/StyledButton.style';
import { LOGIN } from '../../graphql/auth';
import { useMutation } from '@apollo/client';

const validationSchema = YUP.object({
  loginEmail: YUP.string().email("Inavalid email address ").required("Email is required"),
  loginPass: YUP.string().min(6, "Password must contain between 6 and 12 characters ").max(12, "Password must contain between 6 and 12 characters").required("Password is required")
})

const LoginForm: React.FC = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN);
  let navigate = useNavigate();

  useEffect(() => {
    if (data && !loading && !error) {

      console.log(data);
      localStorage.setItem("token", data.login.access_token);
      navigate("/");

    }
  }, [data, error, loading, navigate])

  return (
    <LogSection>
      <div className="wrap">
        <h2>Login</h2>
        <Formik 
          initialValues={{
            loginEmail: "",
            loginPass:"",
          }}
          validationSchema={validationSchema}
          onSubmit={(formData, {setSubmitting}) => {
            setSubmitting(true);

            console.log('submitting');

            login({
              variables: {
                email: formData.loginEmail,
                password: formData.loginPass,
              }
            })

            setSubmitting(false);
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <Input 
                id="email"
                name="loginEmail"
                text="Email" 
                type="email"  
                onChange={handleChange} 
                onBlur = {handleBlur}
                value={values.loginEmail}  
              />
              {touched.loginEmail && errors.loginEmail ? <p className="error">{errors.loginEmail}</p> : null}
              <Input
                id="password" 
                name="loginPass"  
                text="Password" 
                type="password" 
                onChange={handleChange}
                onBlur = {handleBlur} 
                value={values.loginPass}  
              />
              
              {touched.loginPass && errors.loginPass ? <p className="error">{errors.loginPass}</p> : null}
              {error && <p>Wrong email or password!</p>}
              <StyledButton 
                type="submit" 
                text="Login" 
                name="login"
                color="white"
                width="100%"
                backgroundcolor="#F58732"
                radius=".25rem"
              />
            </form>
          )}
        </Formik>
        <p className="switch">Don't have an account yet? <NavLink to ={routes.REGISTER}>Register</NavLink></p>
      </div>


  </LogSection>

  )
}
const LogSection = styled.div`
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
      margin-bottom: 1rem !important;
    }
  }
`;

export default LoginForm;
