import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import MainLayout from 'layouts/MainLayout';

function App(props) {
  React.useEffect(() => {
    const darkListener = (mq: MediaQueryListEvent) => {
      if (mq.matches) {
        document.documentElement.classList.add('theme-dark');
      }
      else {
        document.documentElement.classList.remove('theme-dark');
      }
    };

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    media.addEventListener('change', darkListener);
    darkListener(media);

    return () => {
      media.removeEventListener('change', darkListener);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" component={MainLayout} />
      </Switch>
    </Router>
  );
}

export default App;
