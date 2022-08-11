import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Link } from 'react-router-dom';

import { Container, Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  addFavorite(movie) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');

    axios
      .post( `https://gracean-movies.herokuapp.com/users/${username}/movies/${movie._id}`, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.open("/", "_self");
        alert('Successfully added to favorite list!');
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="my-3 movie-view">
        <Card>
        <Card.Img 
          crossOrigin="" 
          src={movie.ImagePath} />
          
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text> 
            <div className="movie-description">
              <span className="label">Description: </span><br/>
              <span className="value">{movie.Description}</span>
            </div>
            </Card.Text>
            <Card.Text>

            <div className="movie-genre">
              <span className="label">Genre: </span>
              <Link to={`/genres/${movie.Genre.name}`}>{movie.Genre.name}</Link>
            </div>

            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.name}`}>{movie.Director.name}</Link>
            </div>

            <Button
                variant="dark"
                className="fav-button"
                size="sm"
                onClick={() => this.addFavorite(movie)}
              >
              Add to Favorites
              </Button>
            </Card.Text>

            <button onClick={() => { onBackClick(null); }}>Back</button>
        </Card.Body>
        </Card>
      </Container>
    );
  }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      ImagePath: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired
    }).isRequired
  };