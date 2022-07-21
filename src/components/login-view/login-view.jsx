import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };

    return(
        <div className="login-container">
            <div className="login-heading">
            <h2>Welcome to Grace's myFlix app!</h2>
            </div>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <br/><br/>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <br/><br/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

LoginView.PropTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};