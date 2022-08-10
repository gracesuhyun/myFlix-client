import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
// import { NavBar } from './components/nav-bar/nav-bar';

import { Container, Col, Row } from 'react-bootstrap';
import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://gracean-movies.herokuapp.com/movies/', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // onRegistration(registered) {
  //   this.setState({
  //     registered,
  //   });
  // }
  
  render() {
    const {movies, user} = this.state;

    if (!user) 
    return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0)
      return <div className="main-view-empty" />;

    return (

      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col lg={2} md={4} sm={6} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} />

          <Route path="/register" render={() => {
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/profile" render={({ history }) => {
            if (!user) {
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
            }

            return (
              <Col md={8}>
                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>

      </Router>

      // <Container className="fluid">
      //     {selectedMovie
      //       ? (
      //         <Row className="justify-content-md-center">
      //         <Col md={8}>
      //           <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => 
      //             { this.setSelectedMovie(newSelectedMovie); }}/>
      //         </Col>
      //         </Row>
      //         )

      //       : (
      //           <Row className="justify-content-md-center">
      //               {movies.map(movie => (
      //                 <Col lg={2} md={4} sm={6}>
      //               <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => 
      //                 { this.setSelectedMovie(movie) }}/>
      //                 </Col>
      //               ))}
      //           </Row>
      //         )
      //     }
      // </Container>
    );
  }
}

export default MainView;