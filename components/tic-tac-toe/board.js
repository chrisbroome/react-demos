import styles from './board.css'
import {BoardSquare} from './board-square'

const Board = ({
  grid = [],
  color = null,
  onCellSelect,
}) => {
  const handleCellSelect = (item) => {
    if (item.belongsTo !== null) return
    onCellSelect(item)
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {grid.map((item) =>
          <BoardSquare
            key={item.id}
            item={item}
            onClick={() => handleCellSelect(item)}
          />
        )}
      </div>
    </div>
  )
}

export default Board
