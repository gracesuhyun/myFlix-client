import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
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
      console.log(data,'data');
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
    }
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
                Submit
              </Button>
            </Form>

            </Card.Body>

            <Card.Footer>
              <Button
                className="ma-0 col-10 offset-1"
                variant="link"
                onClick={() => props.setRegistered(false)}
              >
                Not Registered? Sign Up Here!
              </Button>
            </Card.Footer>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  setRegistered: PropTypes.func.isRequired,
};