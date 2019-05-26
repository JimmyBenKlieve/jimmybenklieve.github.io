import React from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import HomePage from './pages/Home';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect path="/" to="/home" exact />
        <Route path="/home" component={HomePage} exact />
      </Switch>
    </Router>
  );
}

export default App;
