import React from 'react';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

import {
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import MainSubLayout from 'layouts/MainSubLayout';
import router from './router';

import styles from './index.module.scss';

function MCCAPage(props) {
  return (
    <MainSubLayout
      sider={(
        <aside className={styles.seasonSelector}>
          <QueueAnim
            type="right"
            duration={400}
            interval={50}
            delay={100}
            animConfig={[
              { x: [0, 16] },
            ]}
          >
            {router
              .filter((r) => !r.redirect && !r.hideInMenu)
              .map((r) => (
                <div key={r.to}>
                  <Link
                    className={styles.seasonSelectorItem}
                    to={(
                      r.to.startsWith('/')
                        ? r.to
                        : `${props.match.path}/${r.to.startsWith('./') ? r.to.slice(2) : r.to}`
                    )}
                  >
                    <header>Season 1</header>
                    <div>First Contact</div>
                  </Link>
                </div>
              ))}
          </QueueAnim>
        </aside>
      )}
      siderSkew
    >
      <Switch>
        {router
          .filter((r) => !r.redirect)
          .map((r) => (
            <Route
              key={r.to}
              path={`${props.match.path}/${r.to}`}
              component={r.component}
              exact={r.exact}
            />
          ))
        }

        {router
          .filter((r) => r.redirect)
          .map((r) => (
            <Redirect
              key={r.to}
              to={`${props.match.path}/${r.redirect}`}
              exact
            />
          ))
        }
      </Switch>
    </MainSubLayout>
  );
}

export default MCCAPage;
