import React from 'react'
import styled from "styled-components";

import back from '../../assets/back.svg';

import { useNavigate } from "react-router-dom";
import useStore from '../../store';

const TopicDevices: React.FC = () => {
  const store = useStore();
  let navigate = useNavigate();
  const handleChange=(event: { target: { value: string; }; })=>{
    store.setSelectionResrev(event.target.value);
  }
  return (
    <>
      <TopicDevicesSection>
        <img src={back} alt="icon back" onClick={()=> navigate(-1)}/>
        <select onChange={handleChange} value={store.selectionReserv}>
          <option value="b89fe2ec-f5b8-4461-943c-15073ac0438a">Reserved Devices</option>
          <option value="1d6e3e78-024e-4bed-bc5e-065b6fb7d1c4">Taken Devices</option>
          <option value="45e2e05a-f498-4be1-9a58-d29219f6bbea">History</option>
        </select>
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

  & select {
    border: 2px solid #F58732 !important;
    outline: none !important;
    width: 160px !important;
    height: 40px !important;
    border-radius: .25rem !important;
    padding: 0 8px;
  }
`;

export default TopicDevices