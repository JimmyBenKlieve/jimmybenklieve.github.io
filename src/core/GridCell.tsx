import React from 'react';

import styles from './GridCell.module.scss';

interface IGridCellProps {
  row?: number;
  col?: number;
  rowSpan?: number;
  colSpan?: number;
}

const GridCell = React.forwardRef<HTMLDivElement, React.PropsWithChildren<IGridCellProps>>((props, ref) => {
  const {
    children,

    row = 0,
    col = 0,
    rowSpan = 1,
    colSpan = 1,
  } = props;

  return (
    <div
      ref={ref}
      className={styles.gridCell}
      style={{
        gridRowStart: row + 1,
        gridRowEnd: row + 1 + rowSpan,
        gridColumnStart: col + 1,
        gridColumnEnd: col + 1 + colSpan,
      }}
    >
      {children}
    </div>
  );
});

export default GridCell;
