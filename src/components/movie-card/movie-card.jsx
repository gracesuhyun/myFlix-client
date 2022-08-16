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
        <Card className="my-3 movie-card"  style={{ backgroundColor: '#000a12' }}>
        <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none' }}>
          <Card.Img 
            height="170" 
            crossOrigin="" 
            src={movie.ImagePath} />
            <Card.Body>
            <Card.Subtitle className="mb-2" style={{ color: 'white' }}>{movie.Title}</Card.Subtitle>
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