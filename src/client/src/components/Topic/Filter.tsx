import React from 'react'
import styled from "styled-components";
import close from '../../assets/close.svg'

function Filter({setModalVisible}:any) {

  return (
    <FilterModal>
      <img src={close} alt="close icon" onClick={()=>setModalVisible(false)} />
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
    width:25vw;
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
`;

export default Filter
