import { gql } from "@apollo/client";

export const GET_DEVICESTATUSES = gql`
  query deviceStatuses {
    deviceStatuses {
      id
      name
      created_on
      updated_on
    }
  }
`;

export const CREATE_DEVICESTATUS = gql`

mutation ($name: String! ) {
  createDeviceStatus(createDeviceStatusInput: {
    name: $name
  }) {
    id
  }
}
`;

export const UPDATE_DEVICESTATUS = gql`

mutation ($name: String ) {
  updateDeviceStatus(updateDeviceStatusInput: {
    name: $name,
  }) {
    id
  }
}
`;

export const REMOVE_DEVICESTATUS = gql`
  mutation ($id: String!){
    removeDeviceStatus(id: $id, ) {
      name
    }
  }
`;