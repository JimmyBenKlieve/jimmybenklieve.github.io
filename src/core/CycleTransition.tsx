import classNames from 'classnames';
import React from 'react';

import useCycleTransition from './hooks/useCycleTransition';
import { CycleTransitionContext } from './CycleTransitionGroup';

import type { CycleTransitionConfig, ActivateTransitionCallback } from './hooks/useCycleTransition';

interface ICycleTransitionProps extends CycleTransitionConfig {
  group?: string;
}

interface CycleTransition {
  activate: ActivateTransitionCallback,
};

const CycleTransition = React.forwardRef<CycleTransition, React.PropsWithChildren<ICycleTransitionProps>>((props, ref) => {
  const {
    children,

    activeName,
    startName,
    endName,
    duration,

    onEnd,

    group = 'default',
  } = props;

  const childRef = React.useRef<Element>();
  const groupCtx = React.useContext(CycleTransitionContext);

  if (!React.Children.only(children) || !React.isValidElement<React.RefAttributes<Element> & React.HTMLAttributes<Element>>(children)) {
    throw new Error();
  }

  const [c, activate] = useCycleTransition(childRef.current, {
    activeName: activeName ?? groupCtx?.activeName,
    startName: startName ?? groupCtx?.startName,
    endName: endName ?? groupCtx?.endName,
    duration,
    onEnd,
  });

  React.useImperativeHandle(ref, () => {
    return {
      activate,
    };
  }, [activate]);

  React.useEffect(() => {
    if (typeof groupCtx?.reduceToGroup === 'function') {
      groupCtx.reduceToGroup({
        type: 'add',
        group,
        callback: activate,
      });
    }

    return () => {
      if (typeof groupCtx?.reduceToGroup === 'function') {
        groupCtx.reduceToGroup({
          type: 'delete',
          group,
          callback: activate,
        })
      }
    };
  }, [groupCtx, group, activate]);

  return React.cloneElement(
    children,
    {
      ...children.props,

      ref: childRef,
      className: classNames(children.props.className, c),
    },
  );
});

export default CycleTransition;
