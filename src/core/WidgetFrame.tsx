import React from 'react';

import styles from './WidgetFrame.module.scss';

interface IWidgetFrameProps {
  background?: string;
}

const WidgetFrame = React.forwardRef<HTMLDivElement, React.PropsWithChildren<IWidgetFrameProps>>((props, ref) => {
  const {
    children,
    background = '#eee',
  } = props;

  return (
    <div
      ref={ref}
      className={styles.widgetFrame}
      style={{
        background,
      }}
    >
      {children}
    </div>
  );
});

export default WidgetFrame;
