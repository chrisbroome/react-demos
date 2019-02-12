const inc = x => x + 1

const makeIdGenerator = (seed = 1000, nextFn = inc) => {
  let cur = seed
  return () => {
    cur = nextFn(cur)
    return cur
  }
}

const nextId = makeIdGenerator()

export const makeTodo = ({
  id = nextId(),
  text = '',
  completed = false,
} = {}) => ({
  id,
  text,
  completed,
})

// fake api for manipulating todos
export const makeTodoApi = ({todos = []} = {}) => {
  // key entries by id
  const entries = todos.map(makeTodo).map(x => [x.id, x])
  const store = new Map(entries)

  const create = async (todo) => {
    const item = makeTodo(todo)
    store.set(item.id, item)
    return item
  }

  const remove = async (id) => {
    const item = store.get(item)
    store.delete(id)
    return item
  }

  const update = async (id, todo) => {
    const oldItem = store.get(id)
    if (!oldItem) throw new Error('Todo Item not found')
    const newItem = makeTodo({...oldItem, todo})
    store.set(id, newItem)
    return newItem
  }

  const get = async (id) => store.get(id)

  const list = async () => {
    return [...store.values()]
  }

  return {
    create,
    get,
    remove,
    update,
    list,
  }
}
