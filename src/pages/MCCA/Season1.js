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
    activeDate: [moment([2020, 1, 19]), moment([2020, 2, 16])],
    status: 'done',
  },
  {
    name: 'AirComedist',
    activeDate: [moment([2020, 2, 17]), moment([2020, 2, 27])],
    status: 'done',
  },
  {
    name: 'Blumia',
    activeDate: [moment([2020, 2, 28]), moment([2020, 3, 10])],
    status: 'done',
  },
  {
    name: 'Supa7onyz',
    activeDate: [moment([2020, 3, 11]), moment([2020, 3, 24])],
    status: 'done',
  },
  {
    name: '2jjy',
    activeDate: [moment([2020, 3, 25]), moment([2020, 4, 9])],
    status: 'done',
  },
  {
    name: 'ELENCE',
    activeDate: [moment([2020, 4, 10]), moment([2020, 5, 1])],
    status: 'done',
  },
  {
    name: 'rmk',
    activeDate: [moment([2020, 5, 2]), moment([2020, 5, 3])],
    status: 'done',
  },
  {
    name: 'whisper',
    activeDate: [moment([2020, 5, 4]), moment([2020, 5, 5])],
    status: 'done',
  },
  {
    name: 'Yako',
    activeDate: [moment([2020, 5, 6]), moment([2020, 5, 21])],
    status: 'done',
  },
  {
    name: 'UN1C0DE (concatenate & mixing)',
    activeDate: [moment([2020, 5, 22]), moment([2020, 6, 12])],
    status: 'current',
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
              终于凑齐了 15 位曲师，可以在一起搞事情了！初次尝试，看看能接个什么样子的龙？
              <span role="img" aria-label="龙">🐉</span>
            </p>

            <h3 key="rules" className={styles.rules}>Rules:</h3>
            <p key="rulesContent">
              每个曲师通过聆听上一位曲师完成的片段来完成自己的片段。
              片段长度不少于 30 秒，尽可能保证片段之间能够顺滑地过渡。
            </p>

            <p key="rulesLimitations">
              没有曲风限制，没有 BPM 限制。初始 BPM 已由第一位曲师确定为 128.
            </p>
          </QueueAnim>

          <QueueAnim
            key="entryMembers"
            component="ol"
            type="bottom"
            delay={420}
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
                        <span>
                          {e.format('D MMM.')}
                          {l.status === 'current' ? <span>（预计）</span> : ''}
                        </span>
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
