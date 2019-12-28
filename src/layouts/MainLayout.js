import React from 'react';
import {
  Route, Link, Switch, Redirect,
} from 'react-router-dom';

import DocumentTitle from 'components/DocumentTitle';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ResizeObserver from 'rc-resize-observer';

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
  // {
  //   to: '/events',
  //   text: 'Events',
  // },
  // {
  //   to: '/coding',
  //   text: 'Coding',
  // },
  // {
  //   to: '/gallery',
  //   text: 'Gallery',
  // },
];

function MainLayout(props) {
  const navScrollbarRef = React.useRef(null);
  const currentNav = NAVLIST.find((x) => x.to === props.location.pathname);

  React.useEffect(() => {
    const tick = window.setTimeout(() => {
      navScrollbarRef.current.updateScroll();
    }, 0);

    return () => window.clearTimeout(tick);
  }, []);

  return (
    <DocumentTitle title={currentNav && currentNav.text}>
      <div className={styles.page}>
        <div className={styles.topWall}>
          <div className={styles.nav}>
            <h1>Navigation</h1>
            <PerfectScrollbar
              ref={navScrollbarRef}
              options={{
                useBothWheelAxes: true,
                suppressScrollY: true,
              }}
            >
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
            </PerfectScrollbar>
          </div>
        </div>

        <div className={styles.leftWall}>
          <span className={styles.titleShadow}>Welcome to UN1C0DE.XYZ</span>
        </div>

        <div className={styles.rightWall}>
          <div className={styles.contentWrapper}>
            <Switch>
              {NAVLIST.filter((n) => n.component).map((n) => (
                <Route key={n.to} path={n.to} component={n.component} exact />
              ))}
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
}

export default MainLayout;
