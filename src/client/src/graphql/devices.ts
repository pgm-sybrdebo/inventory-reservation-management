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