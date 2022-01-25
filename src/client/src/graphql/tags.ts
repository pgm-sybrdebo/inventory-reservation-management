import { gql } from "@apollo/client";


export const TOTAL_TAGS_BY_NAME = gql`
query totalTagsByName($name: String!) {
  totalTagsByName(name: $name)
}
`;


export const GET_ALL_TAGS_BY_NAME_WITH_PAGINATION = gql`
  query ($name: String!, $offset: Int!, $limit: Int!){
    tagsByNameWithPagination(name: $name, offset: $offset, limit: $limit) {
      id
      name
      created_on
      updated_on
    }
  }
`;

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

mutation ($id: String!, $name: String! ) {
  updateTag(updateTagInput: {
    id: $id,
    name: $name,
  }) {
    id
  }
}
`;

export const REMOVE_TAG = gql`
  mutation ($id: String!){
    removeTag(id: $id ) 
  }
`;

export const SOFT_REMOVE_TAG = gql`
  mutation ($id: String!){
    softRemoveTag(id: $id) {
      id
    }
  }
`;