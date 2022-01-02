import { gql } from "@apollo/client";

export const TOTAL_USERS = gql`
  query totalUsers {
    totalUsers
  }
`;

export const DIFFERENCE_LAST_MONTH_USERS = gql`
  query differenceLastMonthUsers {
    differenceLastMonthUsers
  }
`;
