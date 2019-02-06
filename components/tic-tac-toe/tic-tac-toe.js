import Board from './board'
import {useResetableState} from '../../hooks/hooks'

const arrayOfLength = num => [...Array(num)]

const createItem = ({
  id = null,
  belongsTo = null,
  winningSquare = false,
} = {}) => ({
  id,
  belongsTo,
  winningSquare,
})

const emptyBoard = arrayOfLength(9).map((_, i) => createItem({id: i}))

const x = 'X'
const o = 'O'

const testBoard = [
  x, o, x,
  o, x, o,
  x, o, x,
]

const sliceRow = (b, rowIndex) => {
  const start = 3 * rowIndex
  return b.slice(start, start + 3)
}

const sliceColumn = (b, colIndex) => {
  return [0, 1, 2].map(rowIndex => b[3 * rowIndex + colIndex])
}

const sliceDiagonal = (b) => {
  return [0, 4, 8].map(i => b[i])
}

const sliceAntiDiagonal = (b) => {
  return [2, 4, 6].map(i => b[i])
}

const chunkIsWinner = vec => {
  const first = vec[0].belongsTo
  return first && vec.every(x => x.belongsTo === first)
}

const setChunkAsWinner = chunk => {
  chunk.forEach(item => item.winningSquare = true)
}

const updateChunkIfWinner = vec => {
  if (!chunkIsWinner(vec)) return
  setChunkAsWinner(vec)
}

const mapWinningSquares = (b) => {
  // create a copy of the board that we will make changes to
  const boardCopy = b.map(x => createItem(x))

  arrayOfLength(3).forEach((_, index) => {
    updateChunkIfWinner(sliceRow(boardCopy, index))
  })

  arrayOfLength(3).forEach((_, index) => {
    updateChunkIfWinner(sliceColumn(boardCopy, index))
  })

  updateChunkIfWinner(sliceDiagonal(boardCopy))
  updateChunkIfWinner(sliceAntiDiagonal(boardCopy))

  return boardCopy
}

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

  return (
    <div>
      <button onClick={resetBoardState}>
        <span>
          Start Over
        </span>
      </button>
      <Board highlight={gameResult && gameResult.winner} grid={boardState} onCellSelect={handleCellSelect}></Board>
      <p>Current Player: {currentPlayer}</p>
      <p>{!gameResult
        ? ''
        : gameResult.winner
          ? `${gameResult.winner} wins!`
          : gameResult.tie
            ? 'Tie Game'
            : 'Unknown Result'}
      </p>
    </div>
  )
}

export default TicTacToe
