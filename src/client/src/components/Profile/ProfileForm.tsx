import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as YUP from "yup";
import styled from "styled-components";
import { EditProfileValues, TokenInfo, UserById } from "../../interfaces";
//import * as routes from '../../routes';
import jwt_decode from "jwt-decode";

import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_ID, UPDATE_USER } from "../../graphql/users";
import Input from "../Input/Input";
import StyledButton from "../Button/StyledButton.style";

const ProfileForm: React.FC = () => {
  let navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const myData = jwt_decode<TokenInfo>(token);
      return myData.sub;
    }
  });
  const [responseError, setResponseError] = useState("");
  const [responseErrorQuery, setResponseErrorQuery] = useState("");
  const [edit] = useMutation(UPDATE_USER, {
    onCompleted: (response) => {
      console.log(response);
      navigate("/login");
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
      setResponseError(error.message);
    },
  });

  const { loading } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    onCompleted: (response: { user: UserById }) => {
      formik.setValues({
        editFname: response.user.firstName,
        editLname: response.user.lastName,
        editEmail: response.user.email,
        editPass: "",
        repeatEditPass: "",
      });
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
      setResponseErrorQuery(error.message);
    },
  });
  const formik: FormikProps<EditProfileValues> = useFormik<EditProfileValues>({
    initialValues: {
      editFname: "",
      editLname: "",
      editEmail: "",
      editPass: "",
      repeatEditPass: "",
    },
    validationSchema: YUP.object({
      editFname: YUP.string()
        .min(2, "First Name must contain minimum 2 characters ")
        .max(30, "First Name must contain less than 30 characters ")
        .required("First Name is required"),

      editLname: YUP.string()
        .min(2, "Last Name must contain minimum 2 characters ")
        .max(30, "Last Name must contain less than 30 characters ")
        .required("Last Name is required"),

      editEmail: YUP.string()
        .email("Inavalid email address ")
        .required("Email is required"),

      editPass: YUP.string()
        .min(6, "Password must contain between 6 and 12 characters ")
        .max(12, "Password must contain between 6 and 12 characters")
        .required("Password is required"),
      repeatEditPass: YUP.string().oneOf(
        [YUP.ref("editPass"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      edit({
        variables: {
          id: id,
          email: values.editEmail,
          password: values.editPass,
          firstName: values.editFname,
          lastName: values.editLname,
        },
      });
      setSubmitting(false);
    },
  });
  return (
    <EditProfileSection>
      <div className="wrap">
        <h2>Edit Account</h2>
        {responseError && <p className="error">{responseError}</p>}
        {responseErrorQuery && <p className="error">{responseErrorQuery}</p>}
        {loading && <p className="error">Loading Your Information...</p>}
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="editFname"
            name="editFname"
            text="First Name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.editFname}
          />
          {formik.touched.editFname && formik.errors.editFname ? (
            <p className="error">{formik.errors.editFname}</p>
          ) : null}
          <Input
            id="editLname"
            name="editLname"
            text="Last Name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.editLname}
          />
          {formik.touched.editLname && formik.errors.editLname ? (
            <p className="error">{formik.errors.editLname}</p>
          ) : null}
          <Input
            id="editEmail"
            name="editEmail"
            text="Email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.editEmail}
          />
          {formik.touched.editEmail && formik.errors.editEmail ? (
            <p className="error">{formik.errors.editEmail}</p>
          ) : null}

          <Input
            id="editPass"
            name="editPass"
            text="Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.editPass}
          />
          {formik.touched.editPass && formik.errors.editPass ? (
            <p className="error">{formik.errors.editPass}</p>
          ) : null}
          <Input
            id="repeatEditPass"
            name="repeatEditPass"
            text="Repeat password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatEditPass}
          />
          {formik.touched.repeatEditPass && formik.errors.repeatEditPass ? (
            <p className="error">{formik.errors.repeatEditPass}</p>
          ) : null}
          <StyledButton
            type="submit"
            text="Update Account"
            name="updateAccount"
            color="white"
            width="100%"
            backgroundcolor="#F58732"
            radius=".25rem"
          />
          <StyledButton
            type="button"
            text="Cancel"
            color="white"
            width="100%"
            backgroundcolor="#ED1534"
            radius=".25rem"
            onClick={() => navigate(-1)}
          />
        </form>
      </div>
    </EditProfileSection>
  );
};

const EditProfileSection = styled.div`
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
      margin-bottom: 1rem;
    }
  }
`;

export default ProfileForm;
