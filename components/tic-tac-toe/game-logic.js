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

export const mapWinningSquares = (b) => {
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

export const emptyBoard = arrayOfLength(9).map((_, i) => createItem({id: i}))
