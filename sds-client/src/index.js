import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import history from './history';
import {Router} from 'react-router-dom';
import {CookieProvider} from 'react-cookie';

ReactDOM.render(
    <CookieProvider>
        <Router history={history}>
            <App/>
        </Router>, document.getElementById('root'));
    </CookieProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
