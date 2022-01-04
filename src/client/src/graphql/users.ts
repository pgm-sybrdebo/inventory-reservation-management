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

export const GET_ALL_USERS_BY_ROLE = gql`
  query usersByRole($role: Int!) {
    usersByRole(role: $role) {
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

export const GET_ALL_USERS_BY_PROFESSION = gql`
  query usersByProfession($profession: Int!) {
    usersByProfession(profession: $profession) {
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

export const UPDATE_USER = gql`
mutation ($firstName: String, $lastName: String, $email: String, $password: String ) {
  updateUser(updateUserInput: {
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    password: $password
  }) {
    id
  }
}
`;

export const REMOVE_USER = gql`
  mutation ($id: String!){
    removeUser(id: $id, ) {
      name
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query user($id: String!) {
    usersByRole(id: $id) {
      id
      firstName
      lastName
      email
      role
      profession
      reservations {
        start_date
        end_date
        deviceId
        device {
          model {
            name
          }
        }
      }
    }
  }
`;