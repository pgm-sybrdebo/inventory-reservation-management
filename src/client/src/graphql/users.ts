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
      cardNumber
      created_on
    }
  }
`;

export const GET_ALL_USERS_WITH_PAGINATION = gql`
  query ($offset: Int!, $limit: Int!){
    usersWithPagination(offset: $offset, limit: $limit) {
      id
      firstName
      lastName
      email
      role
      profession
      cardNumber
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
mutation ( $id: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String! ) {
  updateUser(updateUserInput: {
    id: $id,
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    password: $password
  }) {
    id
  }
}
`;

export const UPDATE_USER_ADMIN = gql`
mutation ( $id: String!, $firstName: String!, $lastName: String!, $email: String!, $cardNumber: Int, $role: Int!, $profession: Int! ) {
  updateUserAdmin (updateUserAdminInput: {
    id: $id,
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    cardNumber: $cardNumber,
    role: $role,
    profession: $profession
  }) {
    id
  }
}
`;

export const REMOVE_USER = gql`
  mutation ($id: String!){
    removeUser(id: $id)
  }
`;


export const SOFT_REMOVE_USER = gql`
  mutation ($id: String!){
    softRemoveUser(id: $id) {
      id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query user($id: String!) {
    user(id: $id) {
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