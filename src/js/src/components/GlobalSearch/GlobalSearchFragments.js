import React, { useState } from "react";
import { Query } from "react-apollo";

import { fieldsOnFragmentsQuery } from "./globalSearchQuery";
import { renderGqlResponse } from "../GQLResponse";
import { Form } from "semantic-ui-react";

export const GlobalSearchFragments = ({ userLoading, hasErrors, ...rest }) => {
  const [keyword, setKeyword] = useState(null);
  const [paging, setPaging] = useState({ page: 1, count: 10 });

  const onKeywordChange = ({ target: { value } }) => {
    if (value && value.length > 0) {
      setKeyword(value);
    } else {
      setKeyword(null);
    }
  };

  const onPagingChange = ({ target: { value, name } }) => {
    if (value !== "") {
      setPaging({ ...paging, [name]: parseInt(value, 10) });
    } else {
      setPaging({ ...paging, [name]: null });
    }
  };

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          control="input"
          id="searchTerm"
          name="searchTerm"
          onChange={onKeywordChange}
          value={keyword ? keyword : ""}
          label="Search Term"
          // fluid
        />
        <Form.Field
          control="input"
          id="page"
          name="page"
          onChange={onPagingChange}
          value={paging.page}
          label="Page"
          type="number"
        />
        <Form.Field
          control="input"
          id="count"
          name="count"
          onChange={onPagingChange}
          value={paging.count}
          label="Results"
          type="number"
        />
      </Form.Group>
      {keyword && (
        <Query query={fieldsOnFragmentsQuery} variables={{ keyword, paging }}>
          {renderGqlResponse}
        </Query>
      )}
    </Form>
  );
};
