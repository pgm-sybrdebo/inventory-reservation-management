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

export const CREATE_RESERVATION = gql`

mutation ($deviceId: String!, $reservationStateId: String!, $userId: String!, $start_date: Timestamp!, $expected_end_date: Timestamp! ) {
  createReservation(createReservationInput: {
    deviceId: $deviceId
    reservationStateId: $reservationStateId
    userId: $userId
    start_date: $start_date
    expected_end_date: $expected_end_date
  }) {
    id
  }
}
`;

export const UPDATE_RESERVATION = gql`
mutation ($id: String! $deviceId: String!, $reservationStateId: String!, $userId: String!, $start_date: Timestamp!, $end_date: Timestamp! ) {
  updateReservation(updateReservationInput: {
    id: $id
    deviceId: $deviceId
    reservationStateId: $reservationStateId
    userId: $userId
    start_date: $start_date
    end_date: $end_date
  }) {
    id
  }
}
`;


export const TAKEN_CONFIRMED = gql`
mutation ($id: String!) {
  takenConfirmed(updateReservationInput: {
    id: $id
  }) {
    id,
    start_date
    deviceId
    expected_end_date
  }
}
`;


export const REMOVE_RESERVATION = gql`
  mutation ($id: String!){
    removeReservation(id: $id) {
      name
    }
  }
`;