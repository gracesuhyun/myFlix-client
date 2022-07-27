import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    
    return (

            <CardGroup>
                <Card className="movie-card">
                  <Card.Img height="200" variant="top" crossOrigin="" src={movie.ImagePath} />
                    <Card.Title>{movie.Title}</Card.Title>
                    
                    <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                </Card>
            </CardGroup>

    );

  }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
    //   Genre: PropTypes.string.isRequired,
      // Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };