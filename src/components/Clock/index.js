/* eslint-disable react/no-array-index-key */

import React from 'react';
import QueueAnim from 'rc-queue-anim';

import moment from 'moment';
import classNames from 'classnames';

import styles from './index.module.scss';

const CHAR_CLASSNAMES = {
  ' ': 'space',
  ':': 'colon',
  '-': 'dash',
  '/': 'slash',
};

function Clock(props) {
  const { className, ...restProps } = props;

  const [now, setNow] = React.useState(Math.ceil(Date.now() / 1000));

  React.useEffect(() => {
    let isRunning = true;

    const tick = () => {
      if (isRunning) {
        setNow(Math.ceil(Date.now() / 1000));
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);

    return () => {
      isRunning = false;
    };
  }, []);

  const elements = React.useMemo(() => {
    const [YYYY, MMM, D, Do, HH, mm, ss] = moment
      .unix(now)
      .format('YYYY MMM. D Do HH mm ss')
      .split(' ');

    const ord = Do.slice(D.length);
    let spCount = 0;

    return [...YYYY, ' ', MMM, ' ', ...D, ord, ' ', ...HH, ':', ...mm, ':', ...ss]
      .reverse()
      .map((c, i, a) => {
        if (CHAR_CLASSNAMES[c]) {
          spCount += 1;

          return (
            <span
              key={i}
              className={classNames(
                styles.char,
                styles[`char-${CHAR_CLASSNAMES[c]}`],
              )}
            >
              {c}
            </span>
          );
        }

        return (
          <QueueAnim
            key={i}
            className={classNames(styles.char, styles[`char-${c}`])}
            component="span"
            duration={[400, 700]}
            interval={0}
            delay={(i - spCount) * 50}
            appear={false}
            ease="easeOutCubic"
            animConfig={[
              {
                y: [0, 12],
                opacity: [1, 0],
              },
              {
                y: [0, -8],
                opacity: [1, 0],
              },
            ]}
            data-char={c}
          >
            <span key={c}>{c}</span>
          </QueueAnim>
        );
      });
  }, [now]);

  return (
    <div
      {...restProps}
      className={classNames(styles.clock, className)}
    >
      {elements}
    </div>
  );
}

export default Clock;
