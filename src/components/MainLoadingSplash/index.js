import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

const MainLoadingSplash = (props) => {
  const { onEnd = null } = props;

  const [isEnd, setEnd] = React.useState(false);

  React.useEffect(() => {
    window.setTimeout(() => setEnd(true), 3000);
  }, []);

  return (
    <div
      className={classNames(styles.loadingSplash, { [styles.isLeaving]: isEnd })}
      onTransitionEnd={onEnd}
    >
      <div className={styles.page}>
        <div className={styles.leftWall} />
        <div className={styles.rightWall} />

        <div className={styles.text}>Please wait a moment...</div>

        <div className={styles.textShadow}>Please wait a moment...</div>
      </div>
    </div>
  );
};

export default MainLoadingSplash;
