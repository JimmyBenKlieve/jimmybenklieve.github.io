import React from 'react';
import classNames from 'classnames';

import styles from './MainSubLayout.module.scss';

function MainSubLayout(props) {
  const {
    sider,
    siderClassName,
    siderStyle,
    siderSkew = false,

    className,
    children,

    contentClassName,
    contentStyle,

    ...restProps
  } = props;

  return (
    <div
      className={classNames(className, styles.main, {
        [styles.enableSkew]: !!siderSkew,
      })}
      {...restProps}
    >
      {do {
        if (sider) {
          <div
            className={classNames(siderClassName, styles.left)}
            style={siderStyle}
          >
            {sider}
          </div>;
        }
      }}

      <div
        className={classNames(contentClassName, styles.right)}
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  );
}

export default MainSubLayout;
