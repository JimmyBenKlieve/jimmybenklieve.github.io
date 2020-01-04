import React from 'react';
import TweenOne from 'rc-tween-one';
import MainSubLayout from 'layouts/MainSubLayout';

import styles from './Games.module.scss';

function GameCenterPage(props) {
  return (
    <MainSubLayout
      className={styles.main}
    >
      <TweenOne
        animation={{ opacity: 1, duration: 300 }}
        style={{ opacity: 0 }}
      >
        <div className={styles.page}>
          Nothing&apos;s here for now...
        </div>
      </TweenOne>
    </MainSubLayout>
  );
}

export default GameCenterPage;
