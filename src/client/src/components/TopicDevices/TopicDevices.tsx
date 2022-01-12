import React, { useState } from 'react'
import styled from "styled-components";
import { Container } from '..';
import back from '../../assets/back.svg';
import {TopicDevice} from '../../interfaces'
import { useNavigate } from "react-router-dom";

const TopicDevices: React.FC<TopicDevice> = ({title}) => {
  let navigate = useNavigate();

  return (
    <>
      <TopicDevicesSection>
        <img src={back} alt="icon back" onClick={()=> navigate(-1)}/>
        <select>
          <option value="all">All</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out Of Stock</option>
          <option value="withMe">With Me</option>
        </select>
      <h2>{title}</h2>
      </TopicDevicesSection>
      
    </>
  )

}

const TopicDevicesSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding:32px 16px 16px;
  width: 100%;
  background-color:#fff;
  position: sticky;
  top:90px;
  left:0;
  z-index:10;
  @media(min-width:767px){
    padding: 32px 64px;
  }
  & img{
    cursor: pointer;
  }
  & h2{
    width: 100%;
    margin-top: 32px;
    margin-bottom:0;
  }
  & select {
    border: 2px solid #F58732 !important;
    outline: none !important;
    width: 160px !important;
    height: 40px !important;
    border-radius: .25rem !important;
  }
`;

export default TopicDevices