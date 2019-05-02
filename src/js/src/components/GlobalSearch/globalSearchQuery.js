import gql from "graphql-tag";

export const simpleQuery = gql`
query ($keyword: String!) {
    search (keyword: $keyword) {
        summary
    }
  }
`;

export const fieldsOnFragmentsQuery = gql`
query ($keyword: String!, $paging: Paging) {
  search (paging: $paging, keyword: $keyword) {
      __typename

      ...order
      ...product
  }
}

fragment order on OrderSearchResult {
    id,
    userName,
    orderSource,
    timeOfOrder
}

fragment product on ProductSearchResult {
    productId,
    productName,
    inventoryAvailableQty,
    productTypeId
}
`;