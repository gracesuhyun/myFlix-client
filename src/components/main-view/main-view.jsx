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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration(registered) {
    this.setState({
      registered,
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
      <Container>
        <Row className="main-view">
          {selectedMovie
            ? (
              <Col>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => 
                  { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
              )

            : (
              <Container>
                <Row>
                    {movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => 
                      { this.setSelectedMovie(movie) }}/>
                    ))}
                </Row>
              </Container>
              )
          }
        </Row>
      </Container>
    );
  }
}

export default MainView;