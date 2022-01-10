import React, { useState } from 'react'
import styled from "styled-components";
import filter from '../../assets/filter.svg';
import {topic} from '../../interfaces'
import Filter from './Filter';
const Topic: React.FC<topic> = ({quantity}) => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log(modalVisible)
  return (
    <>
      <TopicSection>
        <img src={filter} alt="icon filter" onClick={()=> setModalVisible(true)}/>
        <p>{quantity} Models</p>
      </TopicSection>
      {modalVisible && <Filter setModalVisible={setModalVisible}/>}
    </>
  )

}

const TopicSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:32px 16px;
  width: 100%;
  background-color:#fff;
  position: sticky;
  top:90px;
  left:0;
  @media(min-width:767px){
    padding: 32px 64px;
  }
  & img{
    cursor: pointer;
  }
  & p{
    font-size:24px;
    font-weight:400;
    color:#2E3939;
  }
`;

export default Topic