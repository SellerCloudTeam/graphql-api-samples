import React, { useState, useReducer } from "react";
import { Query } from "react-apollo";
import { Form } from "semantic-ui-react";

import { productsQuery, companiesQuery } from "./productsQuery";
import { renderGqlResponse } from "../GQLResponse";

export const Products = ({ userLoading, hasErrors, ...rest }) => {
  const [paging, setPaging] = useState({ count: 10 });
  const [filters, setFilters] = useState({ companyId: 4 });
  const [companiesLoaded, setCompletedFlag] = useReducer(() => true);

  const onCountChange = ({ target: { value } }) => {
    setPaging({ count: parseInt(value, 10) });
  };

  const onCompanyChange = ({ target: { value } }) => {
    setFilters({ companyId: parseInt(value, 10) });
  };

  return (
    <>
      <Query query={companiesQuery} onCompleted={setCompletedFlag}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (error) {
            return <div>Something went wrong...</div>;
          }

          return (
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
                <Form.Field
                  label="Company"
                  control="select"
                  onChange={onCompanyChange}
                  value={filters.companyId}
                >
                  <option value="">Select a company</option>
                  {data.companies.map(company => (
                    <option value={company.id} key={company.id}>{company.name}</option>
                  ))}
                </Form.Field>
              </Form.Group>
            </Form>
          );
        }}
      </Query>
      {companiesLoaded && (
        <Query query={productsQuery} variables={{ paging, filters }}>
          {renderGqlResponse}
        </Query>
      )}
    </>
  );
};
