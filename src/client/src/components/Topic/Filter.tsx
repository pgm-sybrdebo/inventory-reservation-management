import React from 'react'
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import close from '../../assets/close.svg'
import {useFormik, FormikProps} from 'formik';
import * as YUP from 'yup';
import TegSelect from './TegSelect';
import {Filters, FilterValues } from '../../interfaces';
import { Input } from '..';
import StyledButton from '../Button/StyledButton.style';
import useStore from '../../store';


const Filter: React.FC<Filters> = ({setModalVisible}) => {
  const store = useStore();
  let navigate = useNavigate();
  const handleSubmit = (values: { filterSelect: any[]; filterName: string; }) => {
    const selection = values.filterSelect?.map(i=>i.id);
      store.setSearchQuery(values.filterName);
      if(values.filterSelect.length > 0){
        store.setSearchTags(selection);
        store.setFullTags(values.filterSelect);
      }
  }
  
  const formik: FormikProps<FilterValues> = useFormik<FilterValues>({
    initialValues:{
      filterName:store.searchQuery,
      filterSelect: [],
    },
    validationSchema: YUP.object({

      filterName: YUP.string().min(2, "Title must contain minimum 2 characters ").required(),
      filterSelect: YUP.array()
      .of(
        YUP.object().shape({
          id: YUP.string().required(),
          name: YUP.string().required(),
        })
      ),

     }),
    onSubmit:(values, {setSubmitting}) => {
      setSubmitting(true);
      handleSubmit(values)
      setModalVisible(false)
    }
  });

  
  const handleSelection = (items: any) => {
    formik.setFieldValue('filterSelect', items);
  }
  return (
    <FilterModal>
      <img src={close} alt="close icon" onClick={()=>setModalVisible(false)} />
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="filterName"
          name="filterName"
          text="By Name" 
          type="text"  
          onChange={formik.handleChange} 
          onBlur = {formik.handleBlur}
          value={formik.values.filterName}  
        />
        {formik.touched.filterName && formik.errors.filterName ? <p className="error">{formik.errors.filterName}</p> : null}

        <TegSelect
          name = "filterSelect"
          onChange={handleSelection}
          value={formik.values.filterSelect}
          //fullSelection={fullSelection}
        />
        <StyledButton 
            type="submit" 
            text="Apply" 
            name="apply"
            color="#F58732"
            width="100%"
            backgroundcolor="#fff"
            radius = ".25rem"
          />
           <StyledButton 
            type="button" 
            text="Reset Filters" 
            name="reset"
            color="#F58732"
            width="100%"
            backgroundcolor="#fff"
            radius = ".25rem"
            onClick = {()=>{
              store.setSearchTags(null);
              store.setFullTags(null)
              setModalVisible(false)
              navigate(0)
            }}
          />
      </form>


    </FilterModal>
  )
}

const FilterModal = styled.div`
 width: 100vw;
  height: calc(100vh - 90px);
  background-color:#F58732;
  position: fixed;
  top:90px;
  left:0;
  z-index: 1000;
  @media(min-width:1050px){
    width:33vw;
  }
  @media(min-width:1300px){
    width:20vw;
  }
  & img{
    cursor:pointer;
    width:24px;
    height: 24px;
    position: absolute;
    top:32px;
    right:32px;
    fill:white;
  }
  & form{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;
    @media(min-width:768px){
      padding: 0 128px;
    }
    @media(min-width:1050px){
      padding: 0 16px;
    }
    & .selectWrapper{
      margin: 16px 0 64px;
    }
    & label{
      color: white !important;
    }
    & input{
      background-color:transparent !important;
      border: 2px solid #fff;
      color:white !important;
    }
    & .search-wrapper{
      border: 2px solid #fff;
      border-radius: .25rem;
      position: relative !important;
      & .closeIcon{
        position: absolute;
        right:32px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
      }
      & input{
        border:none !important;
      }
      & .chip{
        margin-top: .25rem;
        background: transparent !important;
        color: #fff;
        padding: .25rem;
        border: 1px solid #fff;
        border-radius: .25rem !important;
      }
    }
    & .optionListContainer{
    margin-top: 4px !important;
    padding: 0 !important;
    border: none !important; 
    border-radius: .25rem !important;
  }
  .option{
    color:#F58732 !important;
    background: #fff !important;
    text-transform: capitalize !important;
    &:hover{
      background: #F58732 !important;
      color:#fff !important;
    }
  }
`;

export default Filter
