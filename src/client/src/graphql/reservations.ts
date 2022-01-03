import { gql } from "@apollo/client";

export const TOTAL_MONTH_RESERVATIONS = gql`
  query reservationsOverview($today: String!) {
    reservationsOverview(today: $today) {
      month
      total_reservations
    }
  }
`;

export const RECENT_RESERVATIONS = gql`
  query recentReservations {
    recentReservations {
      id
      start_date
      user {
        firstName
        lastName
      }
      device {
        model {
          name
          max_reservation_time
        }
      }
    }
  }
`;