import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import './login-view.scss';

function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  //declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr('Password must be 5 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send a request to the server for authentication */
    axios.post('https://gracean-movies.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
      props.setUser(username); 
    })
    .catch(e => {
      console.log('no such user')
    });
    }
  };

  return(
    <Router>
    <Container className="py-5 login-container" >
      <Row>
        <Col>
          <Card>
            <Card.Body>
            <Card.Title className="text-center">Welcome to myFlix!</Card.Title>

            <Form>
              <Form.Group className="form-group">
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                type="text" 
                onChange={e => setUsername(e.target.value)} 
                placeholder="Enter Username"
                required minLength="5" />
                {usernameErr && (<p>{usernameErr}</p>)}
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                type="password" 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password must be at least 5 characters"
                required minLength="5" />
                {passwordErr && (<p>{passwordErr}</p>)}
              </Form.Group>
              
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Sign in
              </Button>
            </Form>

            </Card.Body>

            <Card.Footer className="text-center">
              By logging in, you are agreeing to our terms and conditions.
            </Card.Footer>

          </Card>
        </Col>
      </Row>
    </Container>
    </Router>
    
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};

export default connect(null, { setUser })(LoginView);