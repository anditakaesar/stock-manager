/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { Input, Form, Button } from 'semantic-ui-react'

class LoginComponent extends React.Component {
  render() {
    return (
      <div className="login-container">
        <Form>
          <Form.Field>
            <Input placeholder="username" type="text" icon="user" iconPosition="left" />
          </Form.Field>
          <Form.Field>
            <Input placeholder="password" type="password" icon="lock" iconPosition="left" />
          </Form.Field>
          <Button>Login</Button>
        </Form>
      </div>
    )
  }
}

export default LoginComponent
