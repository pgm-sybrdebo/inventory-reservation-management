import { gql } from "@apollo/client";


export const CREATE_MEDIA = gql`

mutation ($modelId: String!, $type: String!, $source: String! ) {
  createMedia(createMediaInput: {
    modelId: $modelId
    type: $type
    source: $source
  }) {
    id
  }
}
`;

export const UPDATE_MEDIA = gql`

mutation ($id: String!, $modelId: String, $type: String, $source: String) {
  updateMedia(updateMediaInput: {
    id: $id
    modelId: $modelId
    type: $type
    source: $source
  }) {
    id
  }
}
`;

export const GET_PICTURE_BY_MODEL_ID = gql`
  query ($modelId: String!) {
    mediaByModelId(modelId: $modelId) {
      id
      type
      source
    }
  }
`;

export const REMOVE_MEDIA = gql`
  mutation ($id: String!){
    removeMedia(id: $id)
  }
`;

export const SOFT_REMOVE_MEDIA = gql`
  mutation ($id: String!){
    softRemoveMedia(id: $id) {
      id
    }
  }
`;