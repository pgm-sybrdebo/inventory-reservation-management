import { Header } from '../components';
import styled from "styled-components";
import Sidebar from '../components/layout/Sidebar';
import FeaturedInfo from '../components/dashboard/home/FeaturedInfo';
import { useLazyQuery, useQuery } from "@apollo/client";
import { DIFFERENCE_LAST_MONTH_USERS, TOTAL_USERS } from '../graphql/users';
import { DIFFERENCE_LAST_MONTH_MODELS, TOTAL_MODELS } from '../graphql/models';
import { DIFFERENCE_LAST_MONTH_DEVICES, TOTAL_DEVICES } from '../graphql/devices';
import Chart from '../components/dashboard/home/Chart';
import { TOTAL_MONTH_RESERVATIONS } from '../graphql/reservations';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { ReservationItem } from '../interfaces';

const Container = styled.div`
  display: flex;
  top: -32px;
`;

const Content = styled.div`
  flex: 4;
`;



const DashboardHome = () => {
  let newReservationsOverview;
  const today = new Date();
  const todayString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  // useEffect(() => {
    
  //   for (let i = 0; i < 12; i++) {
  //     const now = new Date();
  //     now.setDate(1);
  //     now.setMonth(now.getMonth()-i);
  //     console.log("now", now);
  //     getTotalMonthReservations({
  //       variables: {
  //         month: now
  //       }
  //     })

  //   }
  // }, [])

  const { error, loading, data} = useQuery(TOTAL_USERS);
  const { error: errorTotalModels, loading: loadingTotalModels, data:dataTotalModels} = useQuery(TOTAL_MODELS);
  const { error:errorTotalDevices, loading: loadingTotalDevices, data: dataTotalDevices} = useQuery(TOTAL_DEVICES);
  const { error:errorDifferenceLastMonthUsers, loading: loadingDifferenceLastMonthUsers, data: dataDifferenceLastMonthUsers} = useQuery(DIFFERENCE_LAST_MONTH_USERS);
  const { error:errorDifferenceLastMonthDevices, loading: loadingDifferenceLastMonthDevices, data: dataDifferenceLastMonthDevices} = useQuery(DIFFERENCE_LAST_MONTH_DEVICES);
  const { error:errorDifferenceLastMonthModels, loading: loadingDifferenceLastMonthModels, data: dataDifferenceLastMonthModels} = useQuery(DIFFERENCE_LAST_MONTH_MODELS);
  const { error: errorReservationsOverview, loading: loadingReservationsOverview, data: dataReservationsOverview} = useQuery(TOTAL_MONTH_RESERVATIONS, {
    variables: {
      today: todayString,
    }
  });


  if (!loadingReservationsOverview) {
    const reservationsOverview = dataReservationsOverview.reservationsOverview.slice();
    reservationsOverview.reverse();
    newReservationsOverview = reservationsOverview.map(( m:ReservationItem) => {
      const d = new Date(Number(m.month));
      const dString = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
      const monthName = moment(dString).format("MMM-YYYY");
      // console.log(m.month);
      return {...m, month: monthName }
    });
  }
  if (loading || loadingTotalDevices || loadingTotalModels || loadingDifferenceLastMonthModels || loadingDifferenceLastMonthDevices || loadingDifferenceLastMonthUsers || loadingReservationsOverview) return <p>Loading ...</p>

  if (error ||  errorTotalDevices || errorTotalModels || errorDifferenceLastMonthUsers || errorDifferenceLastMonthDevices || errorDifferenceLastMonthModels || errorReservationsOverview) return <p>Error!</p>



  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <Content>
          { (data && dataTotalModels && dataTotalDevices) && <FeaturedInfo 
            totalUsers={data.totalUsers} 
            totalModels={dataTotalModels.totalModels} 
            totalDevices={dataTotalDevices.totalDevices}
            differenceLastMonthUsers = {dataDifferenceLastMonthUsers.differenceLastMonthUsers}
            differenceLastMonthDevices = {dataDifferenceLastMonthDevices.differenceLastMonthDevices}
            differenceLastMonthModels = {dataDifferenceLastMonthModels.differenceLastMonthModels}
          /> }

          {dataReservationsOverview && <Chart dataReserv={newReservationsOverview} />}
          {dataReservationsOverview && <p>{newReservationsOverview[0].__typename}</p> }
          
        </Content>
      </Container>
    </>

  )
}

export default DashboardHome;
