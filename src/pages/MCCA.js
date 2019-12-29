import React from 'react';
import moment from 'moment';

import MainSubLayout from 'layouts/MainSubLayout';

import styles from './MCCA.module.scss';

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

function MCCAPage(props) {
  return (
    <MainSubLayout>
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
            14 amature music composers come together, what will happen if they
            compose a giant single tune one by one?
          </p>

          <p className={styles.rules}>
            Each composer has 2 weeks to finish his own fragment which lasts for
            at least 30 seconds. No limitations on genre and BPM.
          </p>

          <ol>
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
          </ol>
        </div>
      </div>
    </MainSubLayout>
  );
}

export default MCCAPage;
