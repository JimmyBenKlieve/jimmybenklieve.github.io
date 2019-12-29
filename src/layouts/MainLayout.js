import React from 'react';
import {
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

import DocumentTitle from 'components/DocumentTitle';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Clock from 'components/Clock';

import classNames from 'classnames';
import router from '../router';

import styles from './MainLayout.module.scss';

function MainLayout(props) {
  const navScrollbarRef = React.useRef(null);
  const currentNav = router.find((x) => x.to === props.location.pathname);

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
            <PerfectScrollbar
              ref={navScrollbarRef}
              options={{
                useBothWheelAxes: true,
                suppressScrollY: true,
              }}
            >
              <ul className={styles.navlist}>
                {router.map((n) => (
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
          <Clock className={styles.clock} />
        </div>

        <div className={styles.rightWall}>
          <div className={styles.contentWrapper}>
            <React.Suspense fallback="loading...">
              <Switch>
                {router
                  .filter((n) => n.component)
                  .map((n) => (
                    <Route
                      key={n.to}
                      path={n.to}
                      component={n.component}
                      exact={!!n.exact}
                    />
                  ))}
                <Redirect to="/" />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
}

export default MainLayout;
