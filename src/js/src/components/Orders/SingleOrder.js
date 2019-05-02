import React, { useState } from "react";
import { Query } from "react-apollo";

import { renderGqlResponse } from "../GQLResponse";
import { singleOrderQuery } from "./orderQueries";
import { Form } from "semantic-ui-react";

export const SingleOrder = ({ userLoading, hasErrors, ...rest }) => {
  const [orderNumber, setOrderNumber] = useState(5040432);

  const onOrderNumberChange = e => {
    e.preventDefault();

    const { value } = e.target;

    setOrderNumber(parseInt(value, 10));
  };

  return (
    <>
      <Form>
        <Form.Input
          type="number"
          name="order-number"
          id="order_number"
          onChange={onOrderNumberChange}
          value={orderNumber}
          label="Order #"
          width="three"
        />
      </Form>
      <Query query={singleOrderQuery} variables={{ id: orderNumber }}>
        {renderGqlResponse}
      </Query>
    </>
  );
};
