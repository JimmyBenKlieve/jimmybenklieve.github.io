import React from 'react';

import styles from './Home.module.scss';

class HomePage extends React.PureComponent {
  render() {
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
            14 amature music composers come together, what will happen if they compose a giant single tune one by one?
          </p>

          <p className={styles.rules}>
            Each composer has 2 weeks to finish his own segment which lasts for around 30 seconds. No limitations on genre and BPM.
          </p>

          <ol>
            <li className={styles.current}>
              Linear Acceleration
              <div className={styles.activeDate}>9 Dec. ~ 22 Dec.</div>
            </li>
            <li>iD'List</li>
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
}

export default HomePage;
