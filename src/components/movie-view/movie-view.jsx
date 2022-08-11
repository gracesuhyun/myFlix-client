import React from 'react';
import './movie-view.scss';
import { Link } from 'react-router-dom';

import { Container, Card } from 'react-bootstrap';

export class MovieView extends React.Component {

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
            </Card.Text>
            <Card.Text>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.name}`}>{movie.Director.name}</Link>
            </div>
            </Card.Text>
            <button onClick={() => { onBackClick(null); }}>Back</button>
        </Card.Body>
        </Card>
      </Container>
    );
  }
}