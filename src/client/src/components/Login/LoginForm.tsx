import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Formik } from "formik";
import * as YUP from "yup";
import styled from "styled-components";
import * as routes from "../../routes";

import Input from "../Input/Input";
import StyledButton from "../Button/StyledButton.style";
import { LOGIN } from "../../graphql/auth";
import { useMutation } from "@apollo/client";

const validationSchema = YUP.object({
  loginEmail: YUP.string()
    .email("Inavalid email address ")
    .required("Email is required"),
  loginPass: YUP.string()
    .min(6, "Password must contain between 6 and 12 characters ")
    .max(12, "Password must contain between 6 and 12 characters")
    .required("Password is required"),
});

const LoginForm: React.FC = () => {
  const [responseError, setResponseError] = useState("");
  const [login] = useMutation(LOGIN, {
    onCompleted: (response) => {
      localStorage.setItem("token", response.login.access_token);
      navigate("/");
    },
    onError: (error) => {
      console.log(`AUTH ERROR: ${error.message}`);
      setResponseError("Worng Email or Password!");
    },
  });
  let navigate = useNavigate();
  return (
    <LogSection>
      <div className="wrap">
        <h2>Login</h2>
        {responseError && <p className="error">{responseError}</p>}
        <Formik
          initialValues={{
            loginEmail: "",
            loginPass: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(formData, { setSubmitting }) => {
            setSubmitting(true);

            login({
              variables: {
                email: formData.loginEmail,
                password: formData.loginPass,
              },
            });

            setSubmitting(false);
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <Input
                id="email"
                name="loginEmail"
                text="Email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.loginEmail}
              />
              {touched.loginEmail && errors.loginEmail ? (
                <p className="error">{errors.loginEmail}</p>
              ) : null}
              <Input
                id="password"
                name="loginPass"
                text="Password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.loginPass}
              />
              {touched.loginPass && errors.loginPass ? (
                <p className="error">{errors.loginPass}</p>
              ) : null}

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
        <p className="switch">
          Don't have an account yet?{" "}
          <NavLink to={routes.REGISTER}>Register</NavLink>
        </p>
      </div>
    </LogSection>
  );
};
const LogSection = styled.div`
  height: 100vh;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & form {
    width: 100%;
    & button {
      margin-top: 1.5rem !important;
    }
  }
  & div {
    margin: 0;
    padding: 0;
    width: 100%;
    & h2 {
      font-size: 1.8rem !important;
      font-weight: 600;
      color: #000;
      margin-bottom: 1rem !important;
    }
  }
`;

export default LoginForm;
