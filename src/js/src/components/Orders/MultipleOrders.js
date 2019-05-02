import React, { useState } from "react";
import { Query } from "react-apollo";

import { renderGqlResponse } from "../GQLResponse";
import { multipleOrdersQuery } from "./orderQueries";
import { Form } from "semantic-ui-react";

export const MultipleOrder = ({ userLoading, hasErrors, ...rest }) => {
  const [desc, setSortDesc] = useState(true);
  const [by, setBy] = useState("userName");
  const [userName, setUserName] = useState(undefined);
  const [numbers, setNumbers] = useState({ count: 4, orderSource: 21 });

  const onNumberChange = ({ target: { name, value }}) => {
    if (value === "") {
      setNumbers({ ...numbers, [name]: undefined });
      return;
    }

    setNumbers({ ...numbers, [name]: parseInt(value, 10) });
  };

  const onSortChange = ({ target: { checked } }) => {
    setSortDesc(checked);
  };

  const onUsernameChange = ({ target: { value } }) => {
    if (value === "") {
      setUserName(undefined);
      return;
    }
    setUserName(value);
  };

  const onByChange = ({ target: { value, checked } }) => {
    if (checked) {
      setBy("userName");
    } else {
      setBy(null);
    }
  };

  const getFilters = () => {
    return { userName, orderSource: numbers.orderSource };
  };

  const getPaging = () => ({ count: numbers.count });

  const getSorting = () => ({ desc, by });

  return (
    <>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            type="number"
            name="count"
            id="count"
            control="input"
            onChange={onNumberChange}
            value={numbers.count}
            label="Results"
          />
          <Form.Checkbox
            name="sortedDesc"
            id="sortedDesc"
            onChange={onSortChange}
            checked={desc}
            value="userName"
            label="Sort Desc"
            inline
          />
          <Form.Checkbox
            name="by"
            id="by"
            onChange={onByChange}
            label="Sort by Username?"
          />
          <Form.Input
            name="userName"
            id="userName"
            onChange={onUsernameChange}
            value={userName}
            label="Username"
          />
          <Form.Input
            type="number"
            name="orderSource"
            id="orderSource"
            onChange={onNumberChange}
            value={numbers.orderSource}
            label="Order Source"
          />
        </Form.Group>
      </Form>
      <Query
        query={multipleOrdersQuery}
        variables={{
          paging: getPaging(),
          sort: getSorting(),
          filters: getFilters()
        }}
      >
        {renderGqlResponse}
      </Query>
    </>
  );
};
