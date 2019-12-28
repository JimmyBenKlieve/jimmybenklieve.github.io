import React from 'react';
import moment from 'moment';

import styles from './Home.module.scss';

const SCHEDULE = [
  {
    name: 'Linear Acceleration',
    activeDate: [moment([2019, 12 - 1, 9]), moment([2019, 12 - 1, 22])],
    status: 'done',
    bpm: 128,
  },
  {
    name: 'i\'DList',
    activeDate: [moment([2019, 12 - 1, 23]), moment([2020, 1 - 1, 5])],
    status: 'current',
  },
  {
    name: 'Villax',
  },
  {
    name: 'UN1C0DE',
  },
  {
    name: 'VeetaCrush',
  },
  {
    name: 'BlueWind',
  },
  {
    name: 'NceS',
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

/**
 * @param {moment.Moment} m
 */
const formatMonthDate = (m) => m.format('D MMM.');

function HomePage(props) {
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.host}>П&nbsp;&nbsp;Ш∀∃⊥</div>

        <div className={styles.title}>
          <div>Mega</div>
          <div>Composer</div>
          <div>Collaboration</div>
          <div>Activity</div>
          <div className={styles.season}>Season 1</div>
        </div>

        <p className={styles.desc}>
          14 amature music composers come together, what will happen if they compose a giant single
          tune one by one?
        </p>

        <p className={styles.rules}>
          Each composer has 2 weeks to finish his own segment which lasts for around 30 seconds. No
          limitations on genre and BPM.
        </p>

        <ol>
          {SCHEDULE.map((l) => (
            <li>
              <span data-text={l.name}>{l.name}</span>
              {do {
                if (l.activeDate) {
                  const [s, e] = l.activeDate;

                    <div className={styles.activeDate}>
                      <span>{formatMonthDate(s)}</span>
                      <span> ~ </span>
                      <span>{formatMonthDate(e)}</span>
                    </div>;
                }
              }}
            </li>
          ))}
          <li>
            <span data-text="Linear Acceleration">Linear Acceleration</span>
            <div className={styles.activeDate}>9 Dec. ~ 22 Dec.</div>
          </li>
          <li className={styles.current}>
            <span>iD&apos;List</span>
            <div className={styles.activeDate}>23 Dec. ~ 5 Jan.</div>
          </li>

          <li>Villax</li>
          <li>UN1C0DE</li>
          <li>VeetaCrush</li>
          <li>BlueWind</li>
          <li>NceS</li>
          <li>Woolroll</li>
          <li>Blumia</li>
          <li>Supa7onyz</li>
          <li>2jjy</li>
          <li>Flasthond</li>
          <li>rmk</li>
          <li>Whisper</li>
        </ol>
      </div>
    </div>
  );
}

export default HomePage;
