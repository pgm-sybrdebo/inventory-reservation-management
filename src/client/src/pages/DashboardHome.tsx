import styled from "styled-components";
import FeaturedInfo from '../components/dashboard/home/FeaturedInfo';
import { useQuery } from "@apollo/client";
import { DIFFERENCE_LAST_MONTH_USERS, TOTAL_USERS } from '../graphql/users';
import { DIFFERENCE_LAST_MONTH_MODELS, TOTAL_MODELS } from '../graphql/models';
import { DIFFERENCE_LAST_MONTH_DEVICES, RECENT_NEW_DEVICES, TOTAL_DEVICES } from '../graphql/devices';
import Chart from '../components/dashboard/home/Chart';
import { RECENT_RESERVATIONS, TOTAL_MONTH_RESERVATIONS } from '../graphql/reservations';
import moment from 'moment';
import { ReservationItem } from '../interfaces';
import WidgetTableSm from '../components/dashboard/home/WidgetTableSm';
import WidgetTableMd from '../components/dashboard/home/WidgetTableMd';
import AdminLayout from '../layouts/AdminLayout';

const WidgetContainer = styled.div`
  display: flex;
  margin: 1.5rem;
`;


const DashboardHome = () => {
  let newReservationsOverview;
  const today = new Date();
  const todayString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

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
  const { error:errorRecentNewDevices, loading: loadingRecentNewDevices, data: dataRecentNewDevices} = useQuery(RECENT_NEW_DEVICES);
  const { error:errorRecentReservations, loading: loadingRecentReservations, data: dataRecentReservations} = useQuery(RECENT_RESERVATIONS);


  if (!loadingReservationsOverview) {
    const reservationsOverview = dataReservationsOverview.reservationsOverview.slice();
    reservationsOverview.reverse();
    newReservationsOverview = reservationsOverview.map(( m:ReservationItem) => {
      const d = new Date(Number(m.month));
      const dString = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
      const monthName = moment(dString).format("MMM-YYYY");
      return {...m, month: monthName }
    });
  }
  if (loading || loadingTotalDevices || loadingTotalModels || loadingDifferenceLastMonthModels || loadingDifferenceLastMonthDevices || loadingDifferenceLastMonthUsers || loadingReservationsOverview || loadingRecentNewDevices || loadingRecentReservations) return <p>Loading ...</p>

  if (error ||  errorTotalDevices || errorTotalModels || errorDifferenceLastMonthUsers || errorDifferenceLastMonthDevices || errorDifferenceLastMonthModels || errorReservationsOverview || errorRecentNewDevices || errorRecentReservations) return <p>Error!</p>

  // if (dataRecentReservations) {
  //   console.log(dataRecentReservations)
  // }

  return (
    <AdminLayout>
      { (data && dataTotalModels && dataTotalDevices) && <FeaturedInfo 
        totalUsers={data.totalUsers} 
        totalModels={dataTotalModels.totalModels} 
        totalDevices={dataTotalDevices.totalDevices}
        differenceLastMonthUsers = {dataDifferenceLastMonthUsers.differenceLastMonthUsers}
        differenceLastMonthDevices = {dataDifferenceLastMonthDevices.differenceLastMonthDevices}
        differenceLastMonthModels = {dataDifferenceLastMonthModels.differenceLastMonthModels}
      /> }

      {dataReservationsOverview && <Chart dataReserv={newReservationsOverview} title={"Reservations Analytics"} dataKey={"total_reservations"} xData={"month"}/>}
  
      <WidgetContainer>
        {dataRecentNewDevices && <WidgetTableSm recentNewDevices={dataRecentNewDevices.recentNewDevices}/>}
        {dataRecentReservations && <WidgetTableMd recentReservations={dataRecentReservations.recentReservations}/>}
      
      </WidgetContainer>
    </AdminLayout>
  )
}

export default DashboardHome;
