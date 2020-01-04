import React from 'react';
import MainSubLayout from 'layouts/MainSubLayout';
import QueueAnim from 'rc-queue-anim';
import TextyAnim from 'rc-texty';
import TweenOne from 'rc-tween-one';
import moment from 'moment';

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

const splitBySpace = (str) => str
  .split(' ')
  .reduce((p, c, i, a) => {
    p.push(c);

    if (i < a.length - 1) {
      p.push(' ');
    }

    return p;
  }, []);

function HomePage(props) {
  return (
    <MainSubLayout
      className={styles.main}
      sider={(
        <QueueAnim
          component="div"
          type="alpha"
          duration={280}
          interval={450}
          delay={450}
        >
          <QueueAnim
            key="socialLinks"
            component="section"
            className={styles.socialLinks}
            type="bottom"
            duration={300}
            interval={50}
          >
            <h3 key="title">social</h3>

            <QueueAnim
              key="list"
              component="ul"
              type="bottom"
              duration={500}
              interval={40}
              delay={100}
            >
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
            </QueueAnim>
          </QueueAnim>

          <QueueAnim
            key="externalLinks"
            className={styles.externalLinks}
            type="bottom"
            duration={300}
            interval={50}
          >
            <h3 key="title">external</h3>

            <QueueAnim
              key="list"
              component="ul"
              type="scale"
              duration={220}
              interval={40}
              delay={100}
            >
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
            </QueueAnim>
          </QueueAnim>

          <p
            key="copyright"
            className={styles.copyright}
          >
            Jimmy Ben Klieve, (C) 1994 - {moment().year()}.
          </p>

          <p
            key="cc"
            className={styles.cc}
          >
            <Icon
              scope="brand"
              type="creative-commons-by"
              title="Creative Commons: BY"
            />

            <Icon
              scope="brand"
              type="creative-commons-nc"
              title="Creative Commons: NC"
            />

            <Icon
              scope="brand"
              type="creative-commons-nd"
              title="Creative Commons: ND"
            />
          </p>
        </QueueAnim>
      )}
      siderSkew
      siderClassName={styles.sider}
    >
      <TweenOne
        animation={{ opacity: 1, duration: 300 }}
        style={{ opacity: 0 }}
      >
        <div className={styles.page}>
          <QueueAnim
            className={styles.content}
            type="left"
            duration={500}
            interval={50}
            delay={150}
          >
            <img
              key="logo"
              className={styles.logo}
              src="i/logo-191201-black-anaglyphic.png"
              alt="logo"
            />

            <p
              key="p1"
              className={styles.myIntro}
            >
              Hi, welcome!
            </p>

            <p key="p2">
              This is Jimmy Ben Klieve, a.k.a. UN1C0DE.
              <br />
              Yet another JavaScript programmer,
              <br />
              an electro music composer,
              <br />
              and a lame designer.
            </p>

            <p key="p3">
              Nothing much here for now, but I&apos;ll add something fun and useful
              tools when I have spare time.
            </p>

            <p key="p4">:P</p>
          </QueueAnim>
        </div>
      </TweenOne>
    </MainSubLayout>
  );
}

export default HomePage;
