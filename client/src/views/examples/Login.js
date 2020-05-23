import React, { useState, useContext }  from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../utils/apiClient';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  Spinner
} from "reactstrap";

import { UserContext } from '../../contexts/userContext';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(UserContext);

  const submit = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const result = await apiClient.post('/sign-in', {
        email,
        password
      });

      setIsLoading(false);

      userContext.login({
        ...result.data,
        rememberUser
      });
    } catch (error) {
      setError(error.response.data.message || error.message);
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col lg="5">
              { error && <Alert color="danger" children={error} /> }
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Sign in with credentials</small>
                  </div>
                  <Form role="form" onSubmit={submit}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                          onChange={e => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                        onChange={e => setRememberUser(e.target.checked)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span>Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      {
                        isLoading ? <Spinner size="md" color="primary" /> :
                          <Button
                            tag="input"
                            className="my-4"
                            color="primary"
                            type="submit"
                            value="Sign in"
                          />
                      }
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col className="text-right" xs="12">
                  <Link
                    className="text-light"
                    to="/register-page"
                  >
                    <small>Create new account</small>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Login;
