import React, { useState } from "react";
import { Button, Form, Grid, Message, Container } from "semantic-ui-react";
import store from "store";

import { getToken } from "../auth/fetchToken";

export const Login = ({ history }) => {
  const [creds, setCreds] = useState({ Username: "", Password: "" });
  const [error, setError] = useState(null);

  const handleChangeCreds = e => {
    e.preventDefault();

    const { value, name } = e.target;

    setCreds({ ...creds, [name]: value });
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();

    const { Username, Password } = creds;

    if (Username.trim().length === 0 || Password.trim().length === 0) {
      return;
    }

    const response = await getToken(creds);
    console.log(response);

    if (!response.success) {
      setError(response.message);
      return;
    }

    const { access_token: token, token_type: type } = response.data;

    store.set("credentials", { token, type, Username, isLoggedIn: true });
    setError(null);
    history.push("/viewer");
  };

  return (
    <Container>
      <Form error={!!error}>
        <Grid.Column width={4}>
          <Form.Field
            id="form-input-control-Username"
            name="Username"
            control="input"
            label="Username"
            placeholder="Username"
            value={creds.Username}
            onChange={handleChangeCreds}
            error={creds.Username.trim().length === 0}
            required
          />
          <Form.Field
            id="form-input-control-Password"
            name="Password"
            control="input"
            label="Password"
            placeholder="Password"
            type="Password"
            value={creds.Password}
            onChange={handleChangeCreds}
            required
          />
          <Button type="submit" onClick={handleLoginSubmit}>
            Log in
          </Button>
          <Message error header="Not Authorized" content={error} />
        </Grid.Column>
      </Form>
    </Container>
  );
};
