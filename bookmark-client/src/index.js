import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from './layout';


ReactDOM.render(
    <Router>
        <div>
            <Layout />
        </div>
    </Router>,
    document.getElementById('root')
);