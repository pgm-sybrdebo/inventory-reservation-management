import { gql } from "@apollo/client";

export const TOTAL_MODELS = gql`
  query totalModels {
    totalModels
  }
`;

export const DIFFERENCE_LAST_MONTH_MODELS = gql`
  query differenceLastMonthModels {
    differenceLastMonthModels
  }
`;

export const CREATE_MODEL = gql`

mutation ($name: String!, $brand: String!, $description: String!, $quantity: Int!, $specifications: String!, $max_reservation_time: Int! ) {
  createModel(createModelInput: {
    name: $name
    brand: $brand
    description: $description
    quantity: $quantity
    specifications: $specifications
    max_reservation_time: $max_reservation_time
  }) {
    id
  }
}
`;

export const UPDATE_MODEL = gql`

mutation ($id: String!, $name: String!, $brand: String!, $description: String!, $quantity: Int!, $specifications: String!, $max_reservation_time: Int! ) {
  updateModel(updateModelInput: {
    id: $id
    name: $name
    brand: $brand
    description: $description
    quantity: $quantity
    specifications: $specifications
    max_reservation_time: $max_reservation_time
  }) {
    id
  }
}
`;

export const REMOVE_MODEL = gql`
  mutation ($id: String!){
    removeModel(id: $id) {
      name
    }
  }
`;

export const GET_ALL_MODELS = gql`
  query {
    models {
      id
      name
      brand
      description
      specifications
      quantity
      max_reservation_time
    }
  }
`;

export const GET_ALL_MODELS_WITH_PAGINATION = gql`
  query ($offset: Int!, $limit: Int!){
    modelsWithPagination(offset: $offset, limit: $limit) {
      id
      name
      brand
      description
      specifications
      quantity
      max_reservation_time
    }
  }
`;

export const GET_ALL_MODELS_BY_TAG_ID_WITH_PAGINATION = gql`
  query ($tagIds: [String]!, $offset: Int!, $limit: Int!){
    modelsWithPagination(tagIds: $tagIds, offset: $offset, limit: $limit) {
      id
      name
      brand
      description
      specifications
      quantity
      max_reservation_time
    }
  }
`;


export const GET_MODEL_BY_ID = gql`
  query model($id: String!) {
    model(id: $id) {
      name
      brand
      description
      specifications
      quantity
      max_reservation_time
      tags {
        name
      } 
    }
  }
`;

export const GET_TOTAL_MODELS_WITH_FILTER = gql`
  query totalModelsWithFilter ($name: String!, $tagIds: [String]) {
    totalModelsWithFilter (
      filter: {
        name: $name,
        tagIds: $tagIds,
      }
    ) {
      total
    }
  }
`;


export const GET_MODELS_BY_FILTER_WITH_PAGINATION = gql`
  query modelsByFilterWithPagination ($name: String!, $tagIds: [String], $limit: Int!, $offset: Int!) {
    modelsByFilterWithPagination (
      filter: {
        name: $name,
        tagIds: $tagIds,
      },
      limit: $limit,
      offset: $offset
    ) {
      id
      name
      brand
      description
      specifications
      quantity
      max_reservation_time
    }
  }
`

