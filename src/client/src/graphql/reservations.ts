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

// taken: 1d6e3e78-024e-4bed-bc5e-065b6fb7d1c4

// returned: 45e2e05a-f498-4be1-9a58-d29219f6bbea

// reserved: b89fe2ec-f5b8-4461-943c-15073ac0438a


export const GET_RESERVATIONS_BY_USER_ID_AND_RESERVATIONSTATE_ID = gql`
  query reservationsByUserIdAndReservationState ($userId: String!, $reservationStateId: String!) {
    reservationsByUserIdAndReservationState(
      userId: $userId, 
      reservationStateId: $reservationStateId
    ) {
      id
      start_date
      expected_end_date
      end_date
      device {
        model {
          name
        }
      }
    }
  }
`;