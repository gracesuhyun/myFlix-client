import React from 'react';
import './director-view.scss';
import { Container, Card, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    const { movie, director, onBackClick } = this.props;

    return (
      <Container className="my-3">
        <Card className="my-3 director-card">
          <Card.Body>
            <Card.Title>Director</Card.Title>

            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{director.name}</span>
            </Card.Text>

            <Card.Text>
              <span className="label">Description: </span>
              <span className="value">{director.description}</span>
            </Card.Text>

            {/* <Card.Text>
              <span className="label">Date of Birth: </span>
              <span className="value">{director.dateOfBirth}</span>
            </Card.Text> */}

          </Card.Body>
        </Card>

        <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
      </Container>
    );
  }
}