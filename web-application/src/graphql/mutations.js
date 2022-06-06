import { gql } from "@apollo/client";

export const CREATE_CATEOGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      ... on Category {
        id
        name
        percentage
      }
      ... on PercentageOutOfRange {
        message
        lowerBound
        upperBound
      }
      ... on InternalError {
        code
        message
      }
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      ... on Category {
        id
        name
        percentage
      }
      ... on PercentageOutOfRange {
        message
        lowerBound
        upperBound
      }
      ... on DocumentNotFound {
        message
      }
      ... on InternalError {
        code
        message
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($categoryId: ID!) {
    deleteCategory(categoryId: $categoryId) {
      ... on Category {
        id
        name
        percentage
      }
      ... on DocumentNotFound {
        message
      }
      ... on InternalError {
        code
        message
      }
    }
  }
`;
