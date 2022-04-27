import React from 'react';

export type ActivateTransitionCallback = React.Dispatch<React.SetStateAction<void>>;

export interface CycleTransitionConfig {
  activeName?: string;
  startName?: string;
  endName?: string;
  duration?: number;
  onEnd?: EventListener;
}

function useCycleTransition<T extends Element>(
  element: T,
  config?: CycleTransitionConfig,
): [string[], ActivateTransitionCallback] {
  const {
    activeName = 'transition-active',
    startName = 'transition-start',
    endName = 'transition-end',
    onEnd = null,
    duration = Infinity,
  } = (config ?? {});

  const refTime = React.useRef<number>(Date.now());
  const [isActive, setActive] = React.useState<boolean>(false);
  const [names, setClassNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    let req: number = null;

    if (isActive) {
      const isStart = names.includes(startName);
      const isEnd = names.includes(endName);

      if (!isStart && !isEnd) {
        req = window.requestAnimationFrame(() => {
          setClassNames([activeName, startName]);

          let endHandler: EventListener = (evt) => {
            element?.removeEventListener('transitionend', endHandler);
            element?.removeEventListener('transitioncancel', endHandler);

            setClassNames([activeName, endName]);

            if (typeof onEnd === 'function') {
              onEnd(evt);
            };
          };
          element?.addEventListener('transitionend', endHandler);
          element?.addEventListener('transitioncancel', endHandler);
        });
      }
      else if (isEnd) {
        req = window.requestAnimationFrame(() => {
          setClassNames([]);
          setActive(false);
        });
      }
    }

    return () => {
      if (req != null) {
        window.cancelAnimationFrame(req);
      }
    }
  }, [element, names, isActive, activeName, startName, endName, duration, onEnd]);

  React.useEffect(() => {
    let durationChecker: number = null;

    if (isActive && Number.isFinite(duration) && duration > 0) {
      durationChecker = window.setTimeout(() => {
        setClassNames([activeName, endName]);
      }, duration);
    }

    return () => {
      if (durationChecker != null) {
        window.clearTimeout(durationChecker);
      }
    }
  }, [isActive, duration, activeName, endName]);

  const cb: React.Dispatch<React.SetStateAction<void>> = React.useCallback(() => {
    refTime.current = Date.now();
    setActive(true);
  }, []);

  return [names, cb];
}

export default useCycleTransition;
