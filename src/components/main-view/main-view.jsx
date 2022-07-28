import React from 'react';
import axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://gracean-movies.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies:response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistration(registered) {
    this.setState({
      registered,
    });
  }

  getMovies(token) {
    axios.get('https://gracean-movies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const {movies, selectedMovie, user, registered} = this.state;

    if (!user) 
    return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!registered) 
    return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

    if (movies.length === 0)
      return <div className="main-view" />;

    return (
      <Container className="fluid">
          {selectedMovie
            ? (
              <Row className="justify-content-md-center">
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => 
                  { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
              </Row>
              )

            : (
                <Row className="justify-content-md-center">
                    {movies.map(movie => (
                      <Col lg={2} md={4} sm={6}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => 
                      { this.setSelectedMovie(movie) }}/>
                      </Col>
                    ))}
                </Row>
              )
          }
      </Container>
    );
  }
}

export default MainView;