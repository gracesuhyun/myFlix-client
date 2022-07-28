import React from 'react';
import propTypes from 'prop-types';
import './movie-view.scss';

import { Container, Row, Col } from 'react-bootstrap';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', event => {
            console.log(event.key);
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
      }

    render() {

        const {movie, onBackClick} = this.props;

        return (
            <Container className="movie-view-container">

                <Row>
                <Col>
                    <div className="movie-image">
                    <img height="500" crossOrigin="" src={movie.ImagePath} />
                    </div>
                </Col>
                </Row>

                <Row>
                <Col>
                    <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                    </div>
                </Col>
                </Row>

                <Row>
                <Col>
                    <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                    </div>
                </Col>
                </Row>

                <button onClick={() => { onBackClick(null); }}>Back</button>

            </Container>
        );
    }
}