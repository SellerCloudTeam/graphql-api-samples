import React from "react";
import JSONPretty from "react-json-prettify";
import { Grid } from "semantic-ui-react";
import { atomOneLight } from "react-json-prettify/dist/themes";

export const renderGqlResponse = ({ loading, error, data }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <Grid.Column width="8">
      <code>
        <JSONPretty json={data} theme={atomOneLight} />
      </code>
    </Grid.Column>
  );
};
