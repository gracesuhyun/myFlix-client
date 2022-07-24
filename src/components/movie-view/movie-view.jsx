import React from 'react';
import './movie-view.scss'

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
            <div className="movie-view">

                <div className="movie-poster">
                    <img crossOrigin="anonymous" height="300" src={movie.ImagePath} />
                </div>

                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>

                {/* <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.name}</span>
                </div> */}

                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>

                <button onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        );
    }
}