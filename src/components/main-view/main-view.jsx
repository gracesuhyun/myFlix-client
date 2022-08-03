import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
      user: null
    };
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

  getMovies(token) {
    axios
    .get('https://gracean-movies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // setSelectedMovie(newSelectedMovie) {
  //   this.setState({
  //     selectedMovie: newSelectedMovie
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // onLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   console.log('logout successful');
  //   alert('You have been successfully logged out!')
  //   this.setState({
  //     user: null
  //   });
  // }

  // onRegistration(registered) {
  //   this.setState({
  //     registered,
  //   });
  // }

  
  
  render() {
    const { movies, user } = this.state;

    if (!user) 
    return 
      <Row>
        <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        </Col>
      </Row>

    // if (!registered) 
    // return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

    if (movies.length === 0)
    return <div className="main-view" />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} />

        </Row>
      </Router>

      // <Container className="fluid">
      //   <button onClick={() => { this.onLoggedOut() }}>Logout</button>
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