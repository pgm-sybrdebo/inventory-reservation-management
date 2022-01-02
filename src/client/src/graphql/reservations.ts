import { gql } from "@apollo/client";

export const TOTAL_MONTH_RESERVATIONS = gql`
  query reservationsOverview($today: String!) {
    reservationsOverview(today: $today) {
      month
      total_reservations
    }
  }
`;