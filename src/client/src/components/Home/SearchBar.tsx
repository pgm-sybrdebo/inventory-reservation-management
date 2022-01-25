import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as YUP from "yup";
import styled from "styled-components";
import { MySearchValues, TokenInfo } from "../../interfaces";
import jwt_decode from "jwt-decode";

import StyledButton from "../Button/StyledButton.style";
import { useLazyQuery } from "@apollo/client";
import { GET_DEVICE_BY_ID } from "../../graphql/devices";

const SearchBar: React.FC = () => {
  const token = localStorage.getItem("token");

  const currentUserData = jwt_decode<TokenInfo>(token!);

  const currentUser = currentUserData.sub;
  let errorResponse = "";
  let navigate = useNavigate();
  let [getDeviceData, { error, loading }] = useLazyQuery(GET_DEVICE_BY_ID);

  const formik: FormikProps<MySearchValues> = useFormik<MySearchValues>({
    initialValues: {
      query: "",
    },
    validationSchema: YUP.object({
      query: YUP.string()
        .min(6, "This field must contain as minimum 6 characters ")
        .required("This field is required"),
    }),
    onSubmit: async (values) => {
      const result = await getDeviceData({
        variables: { id: values.query },
      });
      if (!result.data) {
        errorResponse = result.error?.message || "Couldn't get device data";
        return;
      }
      if (result.data.getDeviceById.userId === currentUser) {
        navigate(`/device/return/${values.query}`);
      } else {
        navigate(`/device/take-or-reserve/${values.query}`);
      }
    },
  });

  if (loading) {
    return (
      <div className="loading">
        <h1 className="loading__text">Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="loading">
        <h1 className="loading__text">{errorResponse}</h1>
      </div>
    );
  }
  return (
    <SearchSection>
      <section>
        <div className="search__wrapper">
          <form
            onSubmit={formik.handleSubmit}
            className="search__wrapper__form"
          >
            <div>
              <input
                id="query"
                name="query"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.query}
                className="search__wrapper__form__input"
                placeholder="Enter the device's Id"
              />

              <StyledButton
                type="submit"
                text="Find"
                name="find"
                color="white"
                width="20%"
                backgroundcolor="#F58732"
                radius="0 .25rem .25rem 0"
              />
            </div>
            {formik.touched.query && formik.errors.query ? (
              <p className="error">{formik.errors.query}</p>
            ) : null}
          </form>
        </div>

        <h2>Or</h2>
        <StyledButton
          type="button"
          text="Models Overview"
          color="white"
          width="100%"
          backgroundcolor="#F58732"
          radius=".25rem"
          onClick={() => navigate("/models")}
        />
      </section>
    </SearchSection>
  );
};
const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 132px);
  & section {
    width: 100%;
    @media (min-width: 767px) {
      width: 50%;
    }
    & .search__wrapper {
      & .search__wrapper__form {
        width: 100%;
        & div {
          display: flex;
        }
        & .search__wrapper__form__input {
          width: 80%;
          height: 50px;
          border: 2px solid #f58732;
          border-radius: 0.25rem 0 0 0.25rem;
          padding: 0 0.5rem;
          outline: none;
        }
        & button {
          width: 20%;
        }
      }
      & .error {
        margin-top: 0.5rem !important;
      }
    }

    & h2 {
      text-align: center;
      color: #2e3939;
      font-size: 24px;
      margin: 32px 0;
    }
  }
`;

export default SearchBar;
