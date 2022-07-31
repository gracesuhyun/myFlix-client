import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Col, Row, Form, Button, Card, CardGroup } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://gracean-movies.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
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
              
              <Button variant="danger" type="submit" onClick={handleSubmit}>
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

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};