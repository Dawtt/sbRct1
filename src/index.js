import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();





/*

import React, { Component } from 'react';
import ReactDOM from "react";






 class Example extends Component {
    render() {
        return(
            <React.Fragment>
                <p> fragment p1 </p>
                <p> fragment p2 </p>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('root'));*/
