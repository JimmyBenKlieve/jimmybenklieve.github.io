import React from 'react';

import styles from './Home.module.scss';

function HomePage(props) {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src="i/logo-191201-black-anaglyphic.png" alt="logo" />
          </div>

          <p className={styles.myIntro}>Hi, welcome!</p>

          <p>
            This is Jimmy Ben Klieve, a.k.a. UN1C0DE.
            <br />
            Yet another JavaScript programmer,
            <br />
            an electro music composer,
            <br />
            and a lame designer.
          </p>

          <p>
            Nothing much here for now, but I&apos;ll add something fun and useful tools when I have
            spare time.
          </p>

          <p>:P</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
