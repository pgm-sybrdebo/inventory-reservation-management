import React from 'react'
import styled from "styled-components";
import filter from '../../assets/filter.svg';
import {topic} from '../../interfaces'
const Topic: React.FC<topic> = ({quantity}) => (
  <TopicSection>
    <img src={filter} alt="icon filter" />
    <p>{quantity} Models</p>
  </TopicSection>
)

const TopicSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:32px;

  & p{
    font-size:24px;
    font-weight:400;
    color:#2E3939;
  }
`;

export default Topic