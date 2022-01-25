import React from "react";
import styled from "styled-components";
import WidgetListItem from "./WidgetListItem";

const Container = styled.div`
  flex: 3;
  padding: 1.5rem;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const WidgetTableMd = ({ recentReservations }: any) => {
  return (
    <Container>
      <h2>Latest reservations</h2>
      <ul>
        {recentReservations.map((reservation: any) => {
          const start = reservation.start_date;
          const maxDays = reservation.device.model.max_reservation_time;
          const end = start + maxDays * 86400000;

          return (
            <WidgetListItem
              type="reservation"
              key={reservation.id}
              name={reservation.device.model.name}
              start={start}
              end={end}
              firstName={reservation.user.firstName}
              lastName={reservation.user.lastName}
            />
          );
        })}
      </ul>
    </Container>
  );
};

export default WidgetTableMd;
