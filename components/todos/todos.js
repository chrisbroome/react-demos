import {useState, useRef, useEffect} from 'react'
import styles from './todo-item.css'
import {makeTodoApi} from './api'

const TodoItem = ({
  id = null,
  text = '',
  completed = false,
  onChecked = x => x,
  onTextChange = x => x,
  onRemoveTodo = x => x,
}) => {
  const [editableText, setText] = useState(text)
  const [checkedState, setCheckedState] = useState(completed)

  const handleTextChange = e => {
    const newValue = e.target.value
    setText(newValue)
    onTextChange(id, newValue)
  }

  const handleRemove = () => onRemoveTodo(id)

  const handleChecked = (e) => {
    const newValue = e.target.checked
    setCheckedState(newValue)
    onChecked(id, newValue)
  }

  return (
    <div className={styles.todoItem}>
      <div>
        <input type="checkbox" checked={checkedState} onChange={handleChecked} value={id} />
        <input type="text"
          className={`${styles.todoTextEditor} ${checkedState ? styles.completed : ''}`}
          value={editableText}
          onChange={handleTextChange} />
      </div>
      <button className={styles.remove} onClick={handleRemove}>X</button>
    </div>
  )
}

const todoApi = makeTodoApi({
  todos: [
    {text: 'Walk the dogs'},
    {text: 'Pick up prescription'},
    {text: 'Buy groceries'}
  ]
})

const TodoList = ({todos = [], todoApi}) => {
  const handleChecked = async (id, checked) => {
    console.warn(id, checked)
    const updatedItem = await todoApi.update(id, {checked})
  }

  const handleRemove = async (id) => {
    console.warn('remove', id)
  }

  const handleTextChange = async (id, text) => {
    console.warn('text-chnage', id, text)
  }

  return (
    <div className={styles.todoList}>
      {todos.map(item =>
        <TodoItem key={item.id} {...item}
          onChecked={handleChecked}
          onRemoveTodo={handleRemove}
          onTextChange={handleTextChange}
        />
      )}
    </div>
  )
}

const TodoListLoader = ({todoApi}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    // simulate loading the todos
    setTimeout(async () => {
      const todos = await todoApi.list()
      setIsLoading(false)
      setTodos(todos)
    }, 500)
  })

  return (
    <div>
      {
        isLoading
          ? <>
            <div>Loading...</div>
            <progress indeterminate />
          </>
          : <TodoList todos={todos} todoApi={todoApi}></TodoList>
      }
    </div>
  )
}

export const Todos = () => (
  <div>
    <header>
      <h1>Todos</h1>
    </header>
    <TodoListLoader todoApi={todoApi} />
  </div>
)

export default Todos
