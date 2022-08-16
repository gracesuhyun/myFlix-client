import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBar } from '../nav-bar/nav-bar';

import { Container, Col, Row } from 'react-bootstrap';
import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
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

  getMovies(token) {
    axios.get('https://gracean-movies.herokuapp.com/movies/', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
        this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  render() {
    let { movies } = this.props;
    let { user } = this.state;

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

            return <MoviesList movies={movies} />
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to='/' />
            return <Col md={10}>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={5}>
              <MovieView 
              movie={movies.find(m => m._id === match.params.movieId)} 
              onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={`/users/${user}`} render={({ match, history}) => {
            if (!user) return <Redirect to='/' />
            return <Col md={10}>
            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

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

let mapStateToProps = state => {
  return {movies: state.movies}
}

export default connect(mapStateToProps, { setMovies, setUser }) (MainView);