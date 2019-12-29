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

  const [now, setNow] = React.useState(moment());

  React.useEffect(() => {
    const t = window.setInterval(() => {
      setNow(moment());
    }, 500);

    return () => window.clearInterval(t);
  }, []);

  const elements = React.useMemo(() => {
    const [MMM, DD, Do, YYYY, HH, mm, ss] = now
      .format('MMM DD Do YYYY HH mm ss')
      .split(' ');

    const ord = Do.slice(DD.length);
    let spCount = 0;

    return [
      MMM,
      ' ',
      ...DD,
      ord,
      ' ',
      ...YYYY,
      ' ',
      ...HH,
      ':',
      ...mm,
      ':',
      ...ss,
    ]
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
            animatingClassName={[styles.entering, styles.leaving]}
            animConfig={[
              {
                y: [0, 12],
                opacity: [1, 0],
              },
              {
                y: [0, -4],
                opacity: [1, 0],
              },
            ]}
          >
            <span key={c}>{c}</span>
          </QueueAnim>
        );
      });
  }, [now]);

  return (
    <div {...restProps} className={classNames(styles.clock, className)}>
      {elements}
    </div>
  );
}

export default Clock;
