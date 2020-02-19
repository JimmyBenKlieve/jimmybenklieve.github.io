import React from 'react';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

import styles from './Season1.module.scss';

const SCHEDULE = [
  {
    name: 'Linear Acceleration',
    activeDate: [moment([2019, 11, 9]), moment([2019, 11, 22])],
    status: 'done',
    bpm: 128,
  },
  {
    name: 'i\'DLisT',
    activeDate: [moment([2019, 11, 23]), moment([2020, 0, 5])],
    status: 'done',
  },
  {
    name: 'Villax',
    activeDate: [moment([2020, 0, 6]), moment([2020, 0, 19])],
    status: 'done',
  },
  {
    name: 'UN1C0DE',
    activeDate: [moment([2020, 0, 20]), moment([2020, 1, 2])],
    status: 'done',
  },
  {
    name: 'VeetaCrush',
    activeDate: [moment([2020, 1, 3]), moment([2020, 1, 16])],
    status: 'done',
  },
  {
    name: 'BlueWind',
    activeDate: [moment([2020, 1, 17]), moment([2020, 1, 18])],
    status: 'done',
  },
  {
    name: 'NceS',
    activeDate: [moment([2020, 1, 19]), moment([2020, 2, 4])],
    status: 'current',
  },
  {
    name: 'AirComedist',
  },
  {
    name: 'Blumia',
  },
  {
    name: 'Supa7onyz',
  },
  {
    name: '2jjy',
  },
  {
    name: 'Flasthond',
  },
  {
    name: 'rmk',
  },
  {
    name: 'whisper',
  },
];

function MCCASeason1(props) {
  return (
    <TweenOne
      animation={{ opacity: 1, duration: 300 }}
      style={{ opacity: 0 }}
    >
      <div className={styles.main}>
        <QueueAnim
          className={styles.box}
          type="left"
          duration={0}
          interval={50}
          delay={150}
        >
          <div
            key="host"
            className={styles.host}
          >
            П&nbsp;&nbsp;Ш∀∃⊥
          </div>

          <QueueAnim
            key="name"
            className={styles.title}
            type="bottom"
            duration={500}
            interval={50}
          >
            <div key="1">Mega</div>
            <div key="2">Composer</div>
            <div key="3">Collaboration</div>
            <div key="4">Activity</div>
            <div key="5" className={styles.season}>Season 1</div>
          </QueueAnim>

          <QueueAnim
            key="rest"
            type="left"
            delay={250}
            duration={500}
            interval={50}
          >
            <p
              key="description"
              className={styles.desc}
            >
              14 amature music composers come together, what will happen if they
              compose a giant single tune one by one?
            </p>

            <h3 key="rules" className={styles.rules}>Rules:</h3>
            <p key="rulesContent">
              Each composer has 2 weeks to finish his own fragment which lasts for
              about 30 seconds. No limitations on genre and BPM.
            </p>
          </QueueAnim>

          <QueueAnim
            key="entryMembers"
            component="ol"
            type="bottom"
            delay={300}
            duration={300}
            interval={50}
          >
            {SCHEDULE.map((l) => (
              <li key={l.name} className={styles[l.status] || ''}>
                <span data-text={l.name}>{l.name}</span>
                {do {
                  if (l.activeDate) {
                    const [s, e] = l.activeDate;

                      <div className={styles.activeDate}>
                        <span>{s.format('D MMM.')}</span>
                        <span> ~ </span>
                        <span>{e.format('D MMM.')}</span>
                      </div>;
                  }
                }}
              </li>
            ))}
          </QueueAnim>
        </QueueAnim>
      </div>
    </TweenOne>
  );
}

export default MCCASeason1;
