import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBar } from '../nav-bar/nav-bar';

import { Container, Col, Row } from 'react-bootstrap';
import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      favoriteMovies: []
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

  onLoggedIn = (authData) => {
    const { username, email, birthday, favoriteMovies } = authData.user;
    this.setState({ username, favoriteMovies: favoriteMovies || [] });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('birthday', birthday);
    this.getMovies(authData.token);
  };

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

  handleFavorite = (movieId, action) => {
    const { username, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null && username !== null) {
      if (action === 'add') {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(
            `https://gracean-movies.herokuapp.com/users/${username}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie added to favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
  
  render() {
    const {movies, user, favoriteMovies} = this.state;

    return (

      <Router>
        <NavBar user={user} />

        <Container>
        <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
            if (!user) return <Col md={10}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard 
                movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to='/' />
            return <Col md={10}>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={6}>
              <MovieView 
              movie={movies.find(m => m._id === match.params.movieId)} 
              handleFavorite={this.handleFavorite}
              isFavorite={favoriteMovies.includes(match.params.movieId)}
              onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={`/users/${user}`} render={({ match, history}) => {
            if (!user) return <Redirect to='/' />
            return <Col md={10}>
            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* <Route path={`/user-update/${user}`} render={({ match, history }) => {
            if (!user) return <Redirect to='/' />
            return <Col>
            <UserUpdate user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} /> */}

          <Route path="/directors/:name" render={({ match, history }) => {
            return <Col md={8}>
              <DirectorView 
              director={movies.find(m => m.Director.name === match.params.name).Director} 
              onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            return <Col md={8}>
              <GenreView 
              genre={movies.find(m => m.Genre.name === match.params.name).Genre} 
              onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>

        </Container>
      </Router>
    );
  }
}

export default MainView;