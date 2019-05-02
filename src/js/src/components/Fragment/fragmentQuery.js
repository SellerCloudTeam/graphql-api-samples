import gql from "graphql-tag";

export const fragmentQuery = gql`
{
    orders (paging: { page: 1, count: 10 }, filters: { orderSource: 4 } ) {
        ...order
        payments { ...payment },
        items {
            ...item
            bundleItems { ...bundleItem }
        }
    }
  }

  fragment order on Order {
      userName,
      orderSource,
      timeOfOrder,

      client { name },
      company { name }
  }

  fragment payment on OrderPayment {
      auditDate,
      amount,
      transactionReferenceNumber
  }

  fragment item on OrderItem {
      ref: id,
      sku: productId,
      qty,
      productName: displayName,
      product { ...product }
  }

  fragment bundleItem on OrderBundleItem {
      sku: productId,
      qty,
      product { ...product }
  }

  fragment product on Product {
      id,
      productName,
      inventoryAvailableQty,
      productTypeId
  }
`;
