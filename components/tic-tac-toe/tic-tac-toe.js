import {useResetableState} from '../../hooks/hooks'
import Board from './board'
import {emptyBoard, mapWinningSquares} from './game-logic'
import styles from './tic-tac-toe.css'

const x = 'X'
const o = 'O'

const TicTacToe = ({
  initialBoardState = emptyBoard,
  initialCurrentPlayer = x
}) => {
  const [boardState, setBoardState, resetBoardState] = useResetableState(initialBoardState)
  const [currentPlayer, setCurrentPlayer] = useResetableState(initialCurrentPlayer)

  const winner = boardState.find(item => item.winningSquare)
  const gameOver = winner || boardState.every(x => x.belongsTo)
  const gameResult = !gameOver
    ? null
    : winner
      ? {winner: winner.belongsTo}
      : {tie: true}

  const handleCellSelect = (item) => {
    if (gameOver) return
    const i = boardState.findIndex(x => x.id === item.id)
    const copy = [
      ...boardState.slice(0, i),
      {...item, belongsTo: currentPlayer},
      ...boardState.slice(i + 1)
    ]
    const boardWithWinners = mapWinningSquares(copy)
    setBoardState(boardWithWinners)
    setCurrentPlayer(currentPlayer === x ? o : x)
  }

  const resultMessage = !gameResult
    ? <span>Current Player: {currentPlayer}</span>
    : gameResult.winner
    ? `${gameResult.winner} wins!`
    : gameResult.tie
      ? 'Tie Game'
      : 'Unknown Result'

  return (
    <div className={styles.boardContainer}>
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      <p className={styles.resultMessage}>{resultMessage}</p>
      <Board highlight={gameResult && gameResult.winner} grid={boardState} onCellSelect={handleCellSelect}></Board>
      <p></p>
      <button className={styles.startOver} onClick={resetBoardState}>
        Start Over
      </button>
    </div>
  )
}

export default TicTacToe
