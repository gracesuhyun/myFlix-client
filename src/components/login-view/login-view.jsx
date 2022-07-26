import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Form, Button, Card, CardGroup } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return(
    <Container className="login-container">
      <Row>
        <Col>
          <Card>
            <Card.Body>
            <Card.Title>Please Log In</Card.Title>

            <Form>
              <Form.Group className="form-group">
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                type="text" 
                onChange={e => setUsername(e.target.value)} 
                placeholder="Enter Username"
                required />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                type="password" 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password must be at least 5 characters"
                required minLength="5" />
              </Form.Group>
              
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.PropTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};