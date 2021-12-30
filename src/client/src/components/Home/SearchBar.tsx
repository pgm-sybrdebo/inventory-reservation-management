import React from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik, FormikProps} from 'formik';
import * as YUP from 'yup';
import styled from "styled-components";
import { MySearchValues } from '../../interfaces';


import StyledButton from '../Button/StyledButton.style';

const SearchBar: React.FC = () => {


  let navigate = useNavigate();
  const formik: FormikProps<MySearchValues> = useFormik<MySearchValues>({
    initialValues:{
      query: ""
    },
    validationSchema: YUP.object({
      query: YUP.string().min(6, "This field must contain as minimum 6 characters ").required("This field is required")
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <SearchSection>
      <section>
        <div className="search__wrapper">
          <form onSubmit={formik.handleSubmit} className="search__wrapper__form">
            <div>
              <input 
                id="query"
                name="query" 
                type="text"  
                onChange={formik.handleChange} 
                onBlur = {formik.handleBlur}
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
            {formik.touched.query && formik.errors.query ? <p className="error">{formik.errors.query}</p> : null}

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
          onClick = {()=> navigate("/models")}
        />
      </section>
     
  </SearchSection>

  )
}
const SearchSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    height: calc(100vh - 132px);
  & section{
    width: 100%;
    @media(min-width:767px){
      width: 50%;
  }
    & .search__wrapper{
    & .search__wrapper__form{
      width: 100%;
      & div{
        display: flex;
      }
      & .search__wrapper__form__input{
        width: 80%;
        height: 50px;
        border: 2px solid #F58732;
        border-radius: .25rem 0 0 .25rem;
        padding: 0 .5rem;
        outline: none;
      }
      & button{
        width: 20%;
      }
  
    }
    & .error{
      margin-top: .5rem !important;
    }
  }



  & h2{
    text-align: center;
    color: #2E3939;
    font-size:24px;
    margin: 32px 0;
  }
  }
  
`;

export default SearchBar;
