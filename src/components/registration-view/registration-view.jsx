import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Form, Button, Card, CardGroup } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };

    return(
      <Container className="registration-container">
        <Row>
          <Col>
            <CardGroup>
              <Card className="registration-card">

                <Card.Header>Register for Grace's movie app!</Card.Header>

                <Form>

                  <Form.Group className="form-group">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Enter a username"
                    required />
                  </Form.Group>
                  
                  <Form.Group className="form-group">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password must be at least 5 characters"
                    minLength="5"
                    required />
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required/>
                  </Form.Group>

                  <Button varient="primary" type="submit" onClick={handleSubmit}>Submit</Button>

                </Form>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};