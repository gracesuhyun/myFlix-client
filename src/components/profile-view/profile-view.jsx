import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './profile-view.scss';

import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';


export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  getUser = (token) => {
    const username = localStorage.getItem('user');
    
    axios
      .get(`https://gracean-movies.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://gracean-movies.herokuapp.com/users/${username}`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday
        });

        localStorage.setItem('user', this.state.username);
        alert("Profile updated");
        window.open('/profile', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  removeFavorite(movie) {
    const username = localStorage.getItem('user');
    let token = localStorage.getItem("token");

    axios
      .delete(`https://gracean-movies.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Movie successfully removed from favorites")
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteUser() {
    if (!confirm("Are you sure you want to delete your account?")) return;
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://gracean-movies.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      username: value
    });
  }

  setPassword(value) {
    this.setState({
      password: value
    });
  }

  setEmail(value) {
    this.setState({
      email: value
    });
  }

  setBirthday(value) {
    this.setState({
      birthday: value
    });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { username, password, email, birthday } = this.state;

    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    if (!username) {
      return null;
    }

    return (
      <Container className="my-3 profile-view">
        <Row>
          <Col>
            <Card className="my-3 update-profile">
              <Card.Body>
                <Card.Title>My Profile</Card.Title>
                <Form className="update-form" onSubmit={(e) =>
                  this.editUser(
                    e,
                    this.username,
                    this.password,
                    this.email,
                    this.birthday
                  )}>

                  <Form.Group className="my-3">
                    <Form.Label>username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="New username"
                      value={username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="New password"
                      value={password}
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>birthday</Form.Label>
                    <Form.Control
                      type="full-date"
                      name="birthday"
                      value={birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button variant="success" type="submit" onClick={this.editUser}>Update User</Button>
                    <Button className="ml-3" variant="danger" onClick={() => this.deleteUser()}>Delete User</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="my-3">
          <Card.Body>

            <Row>
              <Col>
                <h4 id="fm_text_color">{username}'s Favorite Movies</h4>
              </Col>
            </Row>

            <Row>
            {favoriteMovieList.map((movie) => {
              return (
                <div key={movie._id} className='mx-auto'>
                  <Card style={{ width: '10rem' }} 
                        className="favorite-card my-3">
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Img 
                        className="movie-card-link"
                        variant="top" 
                        crossOrigin="" 
                        src={movie.ImagePath} />
                    </Link>
                
                    <Button 
                      className="remove-favorite"
                      variant="danger"
                      size="sm"
                      onClick={() => this.removeFavorite(movie)}>
                        Remove
                    </Button>
                  </Card>
                </div>
                );
              })}
            </Row>
          </Card.Body>
        </Card>

        <div>
          <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })).isRequired,
  onBackClick: PropTypes.func.isRequired
};



{/* <Col>
<Card>
  <Card.Body>
    {favoriteMovies.length === 0 && (
      <div className="text-center" id="fm_text_color">No Favorite Movies</div>
    )}
    <Row className="favorite-container">
      {favoriteMovies.length > 0 &&
        movies.map((movie) => {
          if (
            movie._id ===
            favoriteMovies.find((fav) => fav === movie._id)
          ) {
            return (
            <Col
            xs={9}
            sm={{ span: 9, offset: 2 }}
            md={{ span: 5, offset: 0 }}
            lg={4}
            xl={3}
            className="mb-3"
              >
              <Card className="favmovie-card" key={movie._id}>
                <Card.Img
                  className="favmovie-image"
                  height="200"
                  variant="top"
                  crossOrigin=""
                  src={movie.ImagePath}
                />
                <Card.Body>
                  <Card.Title className="movie_title">
                    {movie.Title}
                  </Card.Title>
                  <Button size="sm" variant="danger" value={movie._id} onClick={(e) => this.removeFavorites(e, movie)}>Remove</Button>
                </Card.Body>
              </Card>
              </Col>
            );
          }
        })}
    </Row>
  </Card.Body>
</Card>
</Col> */}