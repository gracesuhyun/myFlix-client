import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

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
            // <Container fluid style={{ paddingTop: '0.75rem' }}>
            //     <Row>
            //         <CardGroup>

            //         </CardGroup>
            //     </Row>
            // </Container>
            <div className="movie-view">

                <div className="movie-poster">
                    <img crossOrigin="" src={movie.ImagePath} />
                </div>

                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>

                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>

                <button onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        );
    }
}