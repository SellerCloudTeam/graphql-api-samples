import gql from "graphql-tag";

export const singleOrderQuery = gql`
query ($id: Int) {
    order (id: $id) {
        id,
        userName,
        orderSource,
        timeOfOrder,

        items {
            displayName
        }
    }
  }
`;


export const multipleOrdersQuery = gql`
query ($paging: Paging, $sort: Sort, $filters: OrderFilters) {
    orders (paging: $paging, sort: $sort, filters: $filters) {
        userName,
        orderSource,
        timeOfOrder
    }
  }`;