import React from 'react';
import MainSubLayout from 'layouts/MainSubLayout';

import Icon from 'components/Icon';
import ICON_NETEASE from 'assets/icon/netease-music.svg';

import styles from './Home.module.scss';

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/JimmyBenKlieve',
    icon: <Icon scope="brand" type="github" />,
    text: 'github',
  },
  {
    href: 'https://soundcloud.com/un1c0de',
    icon: <Icon scope="brand" type="soundcloud" />,
    text: 'soundcloud',
  },
  {
    href: 'https://music.163.com/#/artist?id=12038288',
    icon: <Icon component={ICON_NETEASE} />,
    text: 'netease music',
  },
  {
    href: 'https://twitter.com/jimmybenklieve',
    icon: <Icon scope="brand" type="twitter" />,
    text: 'twitter',
  },
];

const EXTERNAL_LINKS = [
  {
    href: 'https://1hz-music.fun/',
    icon: <img src="/i/1hz.svg" alt="" />,
    text: '1Hz music',
  },
  {
    href: 'https://idl.ist/',
    icon: <img src="/i/idlist.png" alt="" />,
    text: 'i\'DLisT',
  },
];

function HomePage(props) {
  return (
    <MainSubLayout
      className={styles.main}
      sider={(
        <div>
          <section className={styles.socialLinks}>
            <h3>social</h3>
            <ul>
              {SOCIAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer noopener">
                    <span>
                      {l.icon}
                      <span>{l.text}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.externalLinks}>
            <h3>external</h3>
            <ul>
              {EXTERNAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={l.text}
                  >
                    {l.icon}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <p className={styles.copyright}>Jimmy Ben Klieve, (C) 1994 - 2019.</p>
        </div>
      )}
      siderSkew
      siderClassName={styles.sider}
      contentClassName={styles.page}
    >
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
          Nothing much here for now, but I&apos;ll add something fun and useful
          tools when I have spare time.
        </p>

        <p>:P</p>
      </div>
    </MainSubLayout>
  );
}

export default HomePage;
