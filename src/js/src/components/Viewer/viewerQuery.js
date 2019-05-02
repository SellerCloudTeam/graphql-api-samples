import { gql } from "apollo-boost";

export const viewerQuery = gql`
  {
    viewer {
      id
      email
      firstName
      lastName
    }
  }
`;