import gql from "graphql-tag";

// query ($paging: Paging, $filters: ProductFilters) {
export const paymentQuery = gql`
query ($paging: Paging, $filters: PaymentFilters)
{
  payments (paging: $paging, filters: $filters ) {
      auditDate,
      amount,
      transactionReferenceNumber,
      orderId
  }
}
`;