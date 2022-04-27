import classNames from 'classnames';
import React from 'react';
import { DateTime } from 'luxon';

import WidgetFrame from '../../core/WidgetFrame';

import styles from './index.module.scss';

const pad = (n: number) => String(n).padStart(2, '0');
const splitSpans = (s: string) => [...s].map((c, i) => <span key={i}>{c}</span>);

const ClockWidget = () => {
  const [now, setNow] = React.useState(() => DateTime.now().setLocale('en'));

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(DateTime.now().setLocale('en'));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    }
  });

  return (
    <WidgetFrame>
      <div className={classNames(styles.clock, now.hour >= 12 ? styles.isPM : styles.isAM)}>
        <div className={styles.plate}>
          <svg viewBox="-32 -32 64 64" preserveAspectRatio="xMidYMid">
            <path
              className={styles.plateCircle}
              d="M 0 -36 a 36 36 0 1 0 0 72 a 36 36 0 1 0 0 -72 m 0 20 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32 Z"
            />

            <rect
              className={styles.hourHand}
              x={-6}
              y={-6}
              width={12}
              height={12}
              rx={4}
              ry={4}
              transform={`rotate(${360 * (now.hour % 12 + now.minute / 60) / 12}) translate(0 -26)`}
            />

            <rect
              className={styles.minuteHand}
              x={-2}
              y={-8}
              width={4}
              height={16}
              rx={2}
              ry={2}
              transform={`rotate(${360 * (now.minute / 60)}) translate(0 -36)`}
            />

            <circle
              className={styles.secondHand}
              cx={0}
              cy={0}
              r={3}
              transform={`rotate(${360 * (now.second / 60)}) translate(0 -42)`}
            />
          </svg>
        </div>

        <div className={styles.time}>
          <div>{splitSpans(pad(now.hour))}</div>
          <div>{splitSpans(pad(now.minute))}</div>
        </div>
      </div>
    </WidgetFrame>
  );
}

export default ClockWidget;
