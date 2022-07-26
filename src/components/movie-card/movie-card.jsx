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
                  <Card.Img variant="top" crossOrigin="" src={movie.ImagePath} />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                  </Card.Body>
                </Card>
            </CardGroup>

    );

    return <div className="grid">{movie.map(MovieCard)}</div>;
  }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
    //   Genre: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };