import React from 'react'
import styled from 'styled-components';
import { FeaturedInfoProps } from '../../../interfaces';
import Widget from './Widget';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;


const FeaturedInfo = ({totalUsers, totalModels, totalDevices, differenceLastMonthUsers, differenceLastMonthDevices, differenceLastMonthModels}:FeaturedInfoProps) => {
  return (
    <Container>
      <Widget title={"Users count"} total={totalUsers} changed={differenceLastMonthUsers}/>
      <Widget title={"Devices count"} total={totalDevices} changed={differenceLastMonthDevices}/>
      <Widget title={"Models count"} total={totalModels} changed={differenceLastMonthModels}/>
    </Container>
  )
}

export default FeaturedInfo
