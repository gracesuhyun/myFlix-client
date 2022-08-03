import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    
    return (
      <Container className="card-container">
        <Row>
          <Col>
            <CardGroup>
                <Card className="my-3 movie-card">
                  <Card.Img height="170" variant="link" crossOrigin="" src={movie.ImagePath} onClick={() => onMovieClick(movie)} />
                    <Card.Title>{movie.Title}</Card.Title>
                </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );

  }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      ImagePath: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };