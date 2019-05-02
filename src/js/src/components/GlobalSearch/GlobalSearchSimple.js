import React, { useState } from "react";
import { Query } from "react-apollo";

import { simpleQuery } from "./globalSearchQuery";
import { renderGqlResponse } from "../GQLResponse";
import { Form } from "semantic-ui-react";

export const GlobalSearchSimple = ({ userLoading, hasErrors, ...rest }) => {
  const [keyword, setKeyword] = useState(null);

  const onKeywordChange = ({ target: { value } }) => {
    if (value && value.length > 0) {
      setKeyword(value);
    } else {
      setKeyword(null);
    }
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Field
            width="three"
            id="searchTerm"
            name="searchTerm"
            control="input"
            label="Search Term"
            onChange={onKeywordChange}
            value={keyword}
          />
        </Form.Group>
      </Form>
      {keyword && (
        <Query query={simpleQuery} variables={{ keyword }}>
          {renderGqlResponse}
        </Query>
      )}
    </>
  );
};
