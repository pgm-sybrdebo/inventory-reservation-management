import { gql } from "@apollo/client";

export const TOTAL_DEVICE_STATUSES_BY_NAME = gql`
query totalDeviceStatusesByName($name: String!) {
  totalDeviceStatusesByName(name: $name)
}
`;


export const GET_ALL_DEVICE_STATUSES_BY_NAME_WITH_PAGINATION = gql`
  query ($name: String!, $offset: Int!, $limit: Int!){
    deviceStatusesByNameWithPagination(name: $name, offset: $offset, limit: $limit) {
      id
      name
      created_on
      updated_on
    }
  }
`;

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

export const CREATE_DEVICE_STATUS = gql`

mutation ($name: String! ) {
  createDeviceStatus(createDeviceStatusInput: {
    name: $name
  }) {
    id
  }
}
`;

export const UPDATE_DEVICE_STATUS = gql`

mutation ($id: String!, $name: String! ) {
  updateDeviceStatus(updateDeviceStatusInput: {
    id: $id
    name: $name
  }) {
    id
  }
}
`;

export const REMOVE_DEVICE_STATUS = gql`
  mutation ($id: String!){
    removeDeviceStatus(id: $id)
  }
`;

export const SOFT_REMOVE_DEVICE_STATUS = gql`
  mutation ($id: String!){
    softRemoveDeviceStatus(id: $id) {
      id
    }
  }
`;