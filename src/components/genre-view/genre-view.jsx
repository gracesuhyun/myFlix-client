import React from 'react';
import './genre-view.scss';
import { Link } from 'react-router-dom';

import { Container, Card, Button, Row } from 'react-bootstrap';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container className="my-3">
        <Card className="my-3 genre-card">
          <Card.Body>

            <Card.Title>Genre</Card.Title>
            
            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{genre.name}</span>
            </Card.Text>
            
            <Card.Text>
              <span className="label">Description: </span>
              <span className="value">{genre.description}</span>
            </Card.Text>
          
          </Card.Body>
        </Card>

        <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
      
      </Container>
    );
  }
}