import styles from './board-square.css'

export const BoardSquare = ({
  item = null,
  onClick
}) => {

  const containerClassName = `
    ${styles.gridItem}
    ${item.winningSquare ? styles.winningSquare : ''}
  `.trim()

  const innerClassName = `
    ${styles.mark}
    ${item.belongsTo ? styles.checked : ''}
  `.trim()

  return (
    <div className={containerClassName} onClick={() => onClick(item)}>
      <div className={innerClassName}>{item.belongsTo}</div>
    </div>
  )
}

export default BoardSquare
