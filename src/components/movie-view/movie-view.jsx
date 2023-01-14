import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Link } from 'react-router-dom';

import { Container, Card, Button, ListGroup } from 'react-bootstrap';

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
          src={movie.ImagePath} 
          height="500"/>
          
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{movie.Title}</Card.Title>

          <ListGroup className="list-group-flush">
          <ListGroup.Item> <span class="card-subtitle">Description: </span> {movie.Description} </ListGroup.Item>

          <ListGroup.Item> <span class="card-subtitle">Genre: </span>
            <Link to={`/genres/${movie.Genre.name}`}>{movie.Genre.name}</Link>
          </ListGroup.Item>

          <ListGroup.Item> <span class="card-subtitle">Director: </span>
              <Link to={`/directors/${movie.Director.name}`}>{movie.Director.name}</Link>
          </ListGroup.Item>
          
          </ListGroup>
          </Card.Body>

          <Card.Footer className="text-muted" style={{ textAlign: 'center' }}>
            <Button
                variant="dark"
                className="m-2 fav-button"
                size="sm"
                onClick={() => this.addFavorite(movie)}
              >
              Add to Favorites
              </Button>
            
            <button onClick={() => { onBackClick(null); }}>Back</button>
          </Card.Footer>
          
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