import React from 'react';
import classNames from 'classnames';

import styles from './MainSubLayout.module.scss';

function MainSubLayout(props) {
  const {
    sider,
    className,
    children,

    ...restProps
  } = props;

  return (
    <div className={classNames(className, styles.main)} {...restProps}>
      {do {
        if (sider) {
          <div className={styles.left}>{sider}</div>;
        }
      }}

      <div className={styles.right}>{children}</div>
    </div>
  );
}

export default MainSubLayout;
