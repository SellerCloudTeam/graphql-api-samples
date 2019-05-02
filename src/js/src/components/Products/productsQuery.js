import gql from "graphql-tag";

export const productsQuery = gql`
query ($paging: Paging, $filters: ProductFilters){
    products (paging: $paging, filters: $filters) {
        sku: id,
        title: productName,
        qty: inventoryAvailableQty,
        type: productTypeId,
        companyId
    }
  }
`;

export const productFragmentQuery = gql`
{
  products (paging: { page: 2, count: 7 }, sort: { by: "id", desc: true }, filters: { companyIds: [162, 163] }) {
      ...product
  }
}

fragment product on Product {
    sku: id,
    name: productName,
    qty: inventoryAvailableQty,
    type: productTypeId
}
`;


export const productComplexTypeQuery = gql`
query getProducts($paging: Paging, $sort: Sort, $filters: ProductFilters) {
  products (paging: $paging, sort: $sort, filters: $filters) {
      ...product
  }
}

fragment product on Product {
    sku: id,
    name: productName,
    qty: inventoryAvailableQty,
    type: productTypeId
}
`;

export const companiesQuery = gql`
{
  companies {
    id,
    name
  }
}
`;