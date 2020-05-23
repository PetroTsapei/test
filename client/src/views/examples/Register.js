import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(UserContext);

  const submit = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const result = await apiClient.post('/sign-up', {
        username,
        email,
        password
      });

      userContext.login({
        ...result.data,
        rememberUser: true
      });
    } catch (error) {
      setError(error.response.data.message || error.message);
    } finally {
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
                    <small>Sign up with credentials</small>
                  </div>
                  <Form role="form" onSubmit={submit}>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          placeholder="Name"
                          type="text"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          placeholder="Email"
                          type="email"
                          name="email"
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
                          required
                          placeholder="Password"
                          type="password"
                          value={password}
                          autoComplete="off"
                          onChange={e => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      {
                        isLoading ? <Spinner size="md" color="primary" /> :
                          <Button
                            tag="input"
                            className="mt-4"
                            color="primary"
                            type="submit"
                            value="Create account"
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
                    to="/"
                  >
                    <small>Already have an account?</small>
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

export default Register;
