import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Form, Button, Card, CardGroup } from 'react-bootstrap';
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  //useState hook
  const [values, setValues] = useState({
    nameErr: '',
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  //validate function
  const validate = () => {
    let isReq = true;
    if (name) {
      setValues({...values, nameErr: 'Name is required'});
      isReq = false;
    }
    if (!username) {
      setValues({...values, usernameErr: 'Username required'});
      isReq = false;
    } else if (username.length < 5) {
      setValues({...values, usernameErr: 'Username must be at least 5 characters long'});
      isReq = false;
    } if (!password) {
      setValues({...values, paswordErr: 'Pasword required'});
      isReq = false;
    } else if (password.length < 5) {
      setValues({...values, passwordErr: 'Pasword must be at least 5 characters long'});
      isReq = false;
    }
    if (!email) {
      setValues({...values, emailErr: 'Email required'});
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({...values, emailErr: 'Email is invalid'});
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    //assign variable isReq to validate function
    const isReq = validate();
    if (isReq) {
      axios.post('https://gracean-movies.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful, please log in!')
        window.open('/', '_self');
      })
      .catch(response => {
        console.error(response);
        alert('unable to register');
      });
    }
  };

    return(
      <Container className="registration-container">
        <Row>
          <Col>
            <CardGroup>
              <Card className="registration-card">

                <Card.Header>Register for Grace's movie app!</Card.Header>

                <Form>

                  <Form.Group controlId="form-name" className="form-group">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Enter your full name"
                    required />
                    {values.nameErr && <p>{values.nameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="form-username" className="form-group">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Enter a username"
                    required />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>
                  
                  <Form.Group controlId="form-password" className="form-group">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password must be at least 5 characters"
                    minLength="5"
                    required />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="form-email" className="form-group">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required/>
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Button varient="danger" type="submit" onClick={handleSubmit}>Submit</Button>
                  <p></p>
                  <p>Already registered? <Link to={'/'}>Sign in here!</Link></p>

                </Form>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
    }),
};