import React from 'react';

import { DateTime } from 'luxon';

import Grid from './core/Grid';
import GridCell from './core/GridCell';

import GlobalStateContext,
{
  globalStateReducer,
  getInitialState,
} from './GlobalStateContext';

import ClockWidget from './widgets/Clock';
import ThemeSwitch from './widgets/ThemeSwitch';

import type {
  IGlobalState,
  DispatchGlobalState,
} from './GlobalStateContext';

import './Root.scss';

const Root: React.FC = () => {
  const [globalState, setGlobalState] = React.useReducer(globalStateReducer, null, getInitialState);

  const ctxValue = React.useMemo(
    () => [globalState, setGlobalState] as [IGlobalState, DispatchGlobalState],
    [globalState],
  );

  const {
    theme,
  } = globalState;

  React.useEffect(() => {
    let colorScheme: string = null;

    switch (theme) {
      case 'time': {
        const now = DateTime.now();
        colorScheme = (now.hour < 7 || now.hour >= 19) ? 'light' : 'dark';
        break;
      }

      case 'system':
        colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        break;

      default:
        colorScheme = theme;
    }

    document.documentElement.classList.add(`color-scheme-${colorScheme}`, `theme-${theme}`);

    return () => {
      document.documentElement.classList.remove(`color-scheme-${colorScheme}`, `theme-${theme}`);
    }
  }, [theme]);

  return (
    <GlobalStateContext.Provider value={ctxValue}>
      <div id="root-container">
        <header id="header">

        </header>

        <main id="main">
          <section className="section">
            <header className="section-header">Widgets</header>

            <Grid
              cellWidth="4rem"
              cellHeight="4rem"
            >
              <GridCell
                row={0}
                col={0}
                rowSpan={3}
                colSpan={3}
              >
                <ClockWidget />
              </GridCell>
            </Grid>
          </section>

          <section className="section">
            <header className="section-header">Settings</header>

            <Grid
              cellWidth="4rem"
              cellHeight="4rem"
            >
              <GridCell
                row={0}
                col={0}
                rowSpan={2}
                colSpan={4}
              >
                <ThemeSwitch />
              </GridCell>
            </Grid>
          </section>
        </main>
      </div>
    </GlobalStateContext.Provider>
  );
}

export default Root;
