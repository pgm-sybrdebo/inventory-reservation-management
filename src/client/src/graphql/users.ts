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

export const GET_ALL_USERS = gql`
  query users {
    users {
      id
      firstName
      lastName
      email
      role
      profession
      created_on
    }
  }
`;