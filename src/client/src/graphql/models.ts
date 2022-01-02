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