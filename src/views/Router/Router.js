import React from 'react';
import { Route } from 'react-router';
import App from '../App';
import './index.css';

const mainRoutes = () => (
    <>
        <Route path='*' component={App} />
    </>
);
export default mainRoutes;
