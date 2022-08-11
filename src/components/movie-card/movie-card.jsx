import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';

import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    
    return (
      <Container className="card-container">
        <Card className="my-3 movie-card">
        <Link to={`/movies/${movie._id}`}>
          <Card.Img 
            height="170" 
            crossOrigin="" 
            src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
          </Card.Body>
          </Link>
        </Card>
      </Container>
    );

  }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      ImagePath: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired
    }).isRequired
  };