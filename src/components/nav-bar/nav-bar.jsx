import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import './nav-bar.scss';

export function NavBar({user}) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar className="nav-bar" sticky="top" bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">myFlix</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m1-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={onLoggedOut}>Log out</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Home</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Register</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}