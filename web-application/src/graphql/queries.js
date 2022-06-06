import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query categories($input: PaginationInput!) {
    categories(input: $input) {
      ... on CategoriesList {
        items {
          id
          name
          percentage
        }
        count
        pageNum
        pageSize
      }
      ... on InternalError {
        code
        message
      }
    }
  }
`;
