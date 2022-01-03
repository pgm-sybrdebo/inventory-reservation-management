import React from 'react'
import styled from 'styled-components';
import { WidgetProps } from '../../../interfaces';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

const WidgetComponent = styled.div`
  margin: 1.5rem;
  flex: 1;
  padding: 1rem;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  border-radius: 1rem;

  h2 { 
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
`;

const Total = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Change = styled.p<StyledProps>`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  color: ${props => props.c > 0 ? '#5AB946' : '#ED0034'};

  svg {
    margin-left: 0.5rem;
    color: ${props => props.c > 0 ? '#5AB946' : '#ED0034'};
  }
`;

const Info = styled.p`
  font-size: 0.8rem;
  color: #CBBEC5;
`;

interface StyledProps {
  c: number;
}

const Widget = ({title, total, changed}:WidgetProps) => {
  return (
  
    <WidgetComponent>
      <h2>{title}</h2>
      <Container>
          <Total>{total}</Total>
          <Change c={changed}>{changed > 0 ? "+" : ""} {changed} {changed < 0 ? <ArrowDownward /> : <ArrowUpward />}</Change>
      </Container>
      <Info>Compared to last month</Info>      
    </WidgetComponent>
  )
}

export default Widget
