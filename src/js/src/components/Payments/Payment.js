import React, { useState } from "react";
import { Query } from "react-apollo";

import { paymentQuery } from "./paymentQuery";
import { renderGqlResponse } from "../GQLResponse";
import { Form } from "semantic-ui-react";

export const Payment = ({ userLoading, hasErrors, ...rest }) => {
  const [paging, setPaging] = useState({ count: 10 });
  const [filters, setFilters] = useState({ orderId: null });

  const onCountChange = ({ target: { value } }) => {
    setPaging({ count: parseInt(value, 10) });
  };

  const onOrderChange = ({ target: { value } }) => {
    setFilters({ orderId: value === "" ? null : parseInt(value, 10) });
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            type="number"
            name="count"
            id="count"
            onChange={onCountChange}
            value={paging.count}
            label="Count"
          />
          <Form.Input
            type="number"
            name="orderId"
            id="orderId"
            onChange={onOrderChange}
            value={filters.orderId ? filters.orderId : ""}
            label="Order Id"
          />
        </Form.Group>
      </Form>
      <Query query={paymentQuery} variables={{ paging, filters }}>
        {renderGqlResponse}
      </Query>
    </>
  );
};
