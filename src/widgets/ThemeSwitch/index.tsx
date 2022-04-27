import Lodash from 'lodash';

import React from 'react';
import classNames from 'classnames';

import GlobalStateContext from '../../GlobalStateContext';

import WidgetFrame from '../../core/WidgetFrame';
import CycleTransition from '../../core/CycleTransition';
import CycleTransitionGroup from '../../core/CycleTransitionGroup';

import styles from './index.module.scss';

type ThemeName = 'light' | 'dark' | 'system' | 'time';

const THEME_ORDER: ThemeName[] = [
  'system',
  'light',
  'dark',
  'time',
];

const ThemeSwitch: React.ComponentType = () => {
  const transitionGroupRef = React.useRef<CycleTransitionGroup>();

  const [globalState, setGlobalState] = React.useContext(GlobalStateContext);

  const setNextTheme = React.useMemo(() => {
    return Lodash.throttle(
      () => {
        setGlobalState((prevState) => {
          const themeIndex = THEME_ORDER.indexOf(prevState.theme);

          return {
            theme: THEME_ORDER[(themeIndex + 1) % THEME_ORDER.length],
          };
        });

        transitionGroupRef.current.activate();
      },
      500,
      {
        leading: true,
        trailing: false,
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fillMaskId = React.useId();
  const tickMaskId = React.useId();

  return (
    <WidgetFrame background={null}>
      <div
        className={classNames(styles.main, styles[`themeSwitch--${globalState.theme}`])}
        onClick={setNextTheme}
      >
        <CycleTransitionGroup
          ref={transitionGroupRef}
          activeName={styles.transitionActive}
          startName={styles.transitionStart}
          endName={styles.transitionEnd}
        >
          <CycleTransition>
            <div className={styles.backgroundGradient} />
          </CycleTransition>

          <svg
            className={styles.icons}
            viewBox="-32 -16 64 32"
            preserveAspectRatio="xMidYMid slice"
          >
            <mask id={fillMaskId}>
              <rect x={-32} y={-32} width={64} height={64} fill="white" />
              <path d="M 1 0 a 1 1 0 1 1 -2 0 v -4 a 1 1 0 1 1 2 0 Z" fill="black" />
              <path d="M 0 1 a 1 1 0 1 1 0 -2 h 3 a 1 1 0 1 1 0 2 z" fill="black" />
            </mask>

            <mask id={tickMaskId}>
              <rect x={-32} y={-32} width={64} height={64} fill="white" />
              <path d="M 1 -7 a 4 4 0 0 1 -8 8 a 7 7 0 0 1 8 -8 Z" fill="black" />
            </mask>

            <CycleTransition>
              <g
                className={classNames(styles.themeIcon, styles.iconSystem)}
                fill="currentColor"
              >
                <g>
                  <circle
                    cx={0}
                    cy={0}
                    r={7}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path d="M 1 -7 a 4 4 0 0 1 -8 8 a 7 7 0 0 1 8 -8 z" />
                  <circle cx={0} cy={-10} r={1} />
                  <circle cx={0} cy={-10} r={1} transform="rotate(45)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(90)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(135)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(180)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(225)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(270)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(315)" />
                </g>
              </g>
            </CycleTransition>

            <CycleTransition>
              <g
                className={classNames(styles.themeIcon, styles.iconLight)}
                fill="currentColor"
              >
                <g>
                  <circle cx={0} cy={0} r={7} />
                  <circle cx={0} cy={-10} r={1} />
                  <circle cx={0} cy={-10} r={1} transform="rotate(45)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(90)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(135)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(180)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(225)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(270)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(315)" />
                </g>
              </g>
            </CycleTransition>

            <CycleTransition>
              <g
                className={classNames(styles.themeIcon, styles.iconDark)}
                fill="currentColor"
              >
                <g>
                  <path d="M 0 -10 a 10 10 0 1 1 -10 10 a 1 1 0 0 1 1.707 -0.707 a 5.5 5 0 1 0 7.568 -7.568 a 1 1 0 0 1 0.707 -1.707 Z" fill="black" />
                </g>
              </g>
            </CycleTransition>

            <CycleTransition>
              <g
                className={classNames(styles.themeIcon, styles.iconTime)}
                fill="currentColor"
              >
                <g>
                  <g mask={`url(#${fillMaskId})`}>
                    <circle
                      cx={0}
                      cy={0}
                      r={7}
                      fill="none"
                      stroke="#000"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M 1 -7 a 4 4 0 0 1 -8 8 a 7 7 0 0 1 8 -8 Z" />
                  </g>

                  <g mask={`url(#${tickMaskId})`}>
                    <path d="M 1 0 a 1 1 0 1 1 -2 0 v -4 a 1 1 0 1 1 2 0 Z" />
                    <path d="M 0 1 a 1 1 0 1 1 0 -2 h 3 a 1 1 0 1 1 0 2 z" />
                  </g>

                  <circle cx={0} cy={-10} r={1} />
                  <circle cx={0} cy={-10} r={1} transform="rotate(45)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(90)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(135)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(180)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(225)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(270)" />
                  <circle cx={0} cy={-10} r={1} transform="rotate(315)" />
                </g>
              </g>
            </CycleTransition>
          </svg>

        </CycleTransitionGroup>
      </div>
    </WidgetFrame>
  );
};

export default ThemeSwitch;
