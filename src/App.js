import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import MainLayout from 'layouts/MainLayout';

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainLayout} />
      </Switch>
    </Router>
  );
}

export default App;
