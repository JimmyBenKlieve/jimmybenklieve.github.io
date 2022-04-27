import React from 'react';
import type { ActivateTransitionCallback } from './hooks/useCycleTransition';

type GroupReducerAction = {
  type: 'add' | 'delete';
  group: string;
  callback: ActivateTransitionCallback,
}

type GroupMap = Map<string, Set<ActivateTransitionCallback>>;

const CycleTransitionContext = React.createContext<{
  reduceToGroup: React.Dispatch<GroupReducerAction>,
} & ICycleTransitionGroupProps>(null);

interface ICycleTransitionGroupProps {
  activeName?: string,
  startName?: string,
  endName?: string,
}

interface CycleTransitionGroup {
  activate: (group?: string) => void;
};

const CycleTransitionGroup = React.forwardRef<CycleTransitionGroup, React.PropsWithChildren<ICycleTransitionGroupProps>>((props, ref) => {
  const {
    children,

    activeName,
    startName,
    endName,
  } = props;

  const [groups, reduceToGroup] = React.useReducer((map: GroupMap, action: GroupReducerAction) => {
    if (action.type === 'add') {
      if (!map.has(action.group)) {
        map.set(action.group, new Set());
      }

      map.get(action.group)?.add(action.callback);
    }
    else if (action.type === 'delete') {
      map.get(action.group)?.delete(action.callback);
    }

    return new Map(map);
  }, new Map());

  React.useImperativeHandle(ref, () => {
    return {
      activate: (group?: string) => {
        if (!group) {
          groups.forEach((set) => {
            set.forEach((cb) => cb());
          });

          return;
        }

        groups.get(group)?.forEach((cb) => cb());
      },
    };
  }, [groups]);

  const ctxProviderValue = React.useMemo(() => {
    return {
      activeName,
      startName,
      endName,

      reduceToGroup,
    };
  }, [activeName, endName, startName]);

  return (
    <CycleTransitionContext.Provider value={ctxProviderValue}>
      {children}
    </CycleTransitionContext.Provider>
  );
});

export {
  CycleTransitionContext,
};

export default CycleTransitionGroup;
