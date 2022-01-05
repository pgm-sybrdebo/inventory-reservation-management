import { gql } from "@apollo/client";

export const GET_TAGS = gql`
  query tags {
    tags {
      id
      name
      created_on
      updated_on
    }
  }
`;

export const CREATE_TAG = gql`

mutation ($name: String! ) {
  createTag(createTagInput: {
    name: $name
  }) {
    id
  }
}
`;

export const UPDATE_TAG = gql`

mutation ($id: String!, $name: String ) {
  updateTag(updateTagInput: {
    id: $id,
    name: name,
  }) {
    id
  }
}
`;

export const REMOVE_TAG = gql`
  mutation ($id: String!){
    removeTag(id: $id, ) {
      name
    }
  }
`;