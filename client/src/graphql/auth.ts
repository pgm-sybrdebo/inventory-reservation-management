import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(loginUserInput: {
      email: $email
      password: $password
    }) {
      access_token
      user {
        id
      }
    }
  }
`;

export const REGISTER = gql`
  mutation signup($email: String!, $password: String!, $firstName: String!, $lastName: String!, $role: Int!, $cardNumber: Int!) {
    signup(signupUserInput: {
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      role: $role
      cardNumber: $cardNumber
    }){
      id
    }
  }
`;

// just for testing
// export const GET_ALL_USERS = gql`
// query {
//   users {
//     firstName
//     id
//   }
// }
// `;