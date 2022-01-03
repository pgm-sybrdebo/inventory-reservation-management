import { gql } from "@apollo/client";

export const TOTAL_DEVICES = gql`
  query totalDevices {
    totalDevices
  }
`;

export const DIFFERENCE_LAST_MONTH_DEVICES = gql`
  query differenceLastMonthDevices {
    differenceLastMonthDevices
  }
`;

export const RECENT_NEW_DEVICES = gql`
  query recentNewDevices {
    recentNewDevices {
      id
      created_on
      model {
        name
      }
    }
  }
`;

export const GET_ALL_DEVICES = gql`
  query devices {
    devices {
      id
      deviceStatus {
        name
      }
      model {
        name
        brand
        description
        specifications
        max_reservation_time
      }
      created_on
      updated_on
    }
  }
`;
export const GET_ALL_STOCK_DEVICES = gql`
  query stockDevices {
    stockDevices {
      id
      deviceStatus {
        name
      }
      model {
        name
        brand
        description
        specifications
        max_reservation_time
      }
      created_on
      updated_on
    }
  }
`;

export const GET_ALL_BORROWED_DEVICES = gql`
  query borrowedDevices {
    borrowedDevices {
      id
      deviceStatus {
        name
      }
      model {
        name
        brand
        description
        specifications
        max_reservation_time
      }
      user {
        firstName
        lastName
      }
      created_on
      updated_on
    }
  }
`;

export const GET_ALL_IN_CHECK_DEVICES = gql`
  query inCheckDevices {
    inCheckDevices {
      id
      model {
        name
        brand
        description
        specifications
        max_reservation_time
      }
      created_on
      updated_on
    }
  }
`;

export const CREATE_DEVICE = gql`

mutation ($modelId: String!, $deviceStatusId: String!, $qr_code: String! ) {
  createDevice(createDeviceInput: {
    modelId: $modelId,
    deviceStatusId: $deviceStatusId,
    qr_code: $qr_code,
  }) {
    id
  }
}
`;

export const UPDATE_DEVICE = gql`

mutation ($modelId: String, $deviceStatusId: String, $qr_code: String ) {
  updateDevice(updateDeviceInput: {
    modelId: modelId,
    deviceStatusId: $deviceStatusId,
    qr_code: $qr_code,
  }) {
    id
  }
}
`;

export const REMOVE_DEVICE = gql`
  mutation ($id: String!){
    removeDevice(id: $id, ) {
      id
    }
  }
`;

export const GET_DEVICE_BY_ID = gql`
  query ($id: String!){
    getDeviceById(id: $id, ) {
      id
      qr_code
      model {
        name
      }
      damages {
        title
        picture 
        description
      }
    }
  }
`;

export const GET_DEVICES_BY_MODELID = gql`
  query ($modelId: String!){
    getDevicesByModelId(modelId: $modelId, ) {
      id
      qr_code
      damages {
        title
        picture 
        description
      }
    }
  }
`;



