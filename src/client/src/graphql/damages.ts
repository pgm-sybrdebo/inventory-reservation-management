import { gql } from "@apollo/client";


export const CREATE_DAMAGE = gql`

mutation ($deviceId: String!, $reservationId: String, $title: String!, $description: String!, $picture: String!  ) {
  createDamage(createDamageInput: {
    deviceId: $deviceId
    reservationId: $reservationId
    title: $title
    description: $description
    picture: $picture
  }) {
    id
  }
}
`;

export const UPDATE_DAMAGE = gql`

mutation ($id: String!, $deviceId: String!, $reservationId: String!, $title: String!, $description: String!, $picture: String!  ) {
  updateDamage(updateDamageInput: {
    id: $id
    deviceId: $deviceId
    reservationId: $reservationId
    title: $title
    description: $description
    picture: $picture
  }) {
    id
  }
}
`;

export const REMOVE_DAMAGE = gql`
  mutation ($id: String!){
    removeDamage(id: $id, ) {
      name
    }
  }
`;