import styles from './Grid.module.scss';

interface IGridProps {
  cellWidth?: string;
  cellHeight?: string;
  gapSize?: string;
}

const Grid: React.FC<React.PropsWithChildren<IGridProps>> = (props) => {
  const {
    children,

    cellWidth = '1rem',
    cellHeight = '1rem',
    gapSize = '1rem',
  } = props;

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateRows: `repeat(auto-fill, ${cellHeight})`,
        gridTemplateColumns: `repeat(auto-fill, ${cellWidth})`,
        gridAutoRows: cellHeight,
        gridAutoColumns: cellWidth,
        gap: gapSize,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
