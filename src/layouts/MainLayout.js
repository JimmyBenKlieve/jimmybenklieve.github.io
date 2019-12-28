import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import DocumentTitle from 'components/DocumentTitle';

import classNames from 'classnames';

import HomePage from 'pages/Home';
import MCCAPage from 'pages/MCCA';

import styles from './MainLayout.module.scss';

const NAVLIST = [
  {
    to: '/',
    text: 'Home',
    component: HomePage,
  },
  {
    to: '/mcca',
    text: 'MCCA',
    component: MCCAPage,
  },
  /*
  {
    to: '/events',
    text: 'Events',
  },
  {
    to: '/coding',
    text: 'Coding',
  },
  {
    to: '/gallery',
    text: 'Gallery',
  },
  */
];

function MainLayout(props) {
  const currentNav = NAVLIST.find((x) => x.to === props.location.pathname);

  return (
    <DocumentTitle title={currentNav && currentNav.text}>
      <div className={styles.page}>
        <div className={styles.topWall}>
          <div className={styles.nav}>
            <h1>Navigation</h1>
            <ul className={styles.navlist}>
              {NAVLIST.map((n) => (
                <li
                  key={`${n.to}.${n.text}`}
                  className={classNames(n.className, styles.navitem, {
                    [styles.active]: props.location.pathname === n.to,
                  })}
                >
                  <Link to={n.to}>{n.text}</Link>
                </li>
              ))}
              <li className={styles.whitespace} />
            </ul>
          </div>
        </div>
        <div className={styles.leftWall}>
          <span className={styles.titleShadow}>Welcome to UN1C0DE.XYZ</span>
        </div>
        <div className={styles.rightWall}>
          <div className={styles.content}>
            <Switch>
              {NAVLIST.filter((n) => n.component).map((n) => (
                <Route key={n.to} path={n.to} component={n.component} exact />
              ))}
            </Switch>
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
}

export default MainLayout;
