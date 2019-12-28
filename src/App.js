import React from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

// import MainLoadingSplash from './components/MainLoadingSplash';

import HomePage from './pages/Home';
// import styles from './App.module.scss';

function App() {
  // const loadingEnded = React.useState(false);

  return (
    <Router>
      {/*
      <MainLoadingSplash className={styles.splash} />

      <div className={styles.page}>
        <div className={styles.leftWall} />
        <div className={styles.rightWall} />
      </div> */}

      <Switch>
        <Redirect path="/" to="/home" exact />
        <Route path="/home" component={HomePage} exact />
      </Switch>
    </Router>
  );
}

export default App;
