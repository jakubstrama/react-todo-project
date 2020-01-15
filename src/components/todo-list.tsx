// Import dependencies
import * as React from 'react'

// Import TodoItem
import TodoItem from './todo-item'

// Import interfaces
import { TodoListInterface } from './../interfaces'

// TodoList component
const TodoList = (props: TodoListInterface) => {
  return (
    <div className="todo-list">
      <ul>
        {props.todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              handleTodoUpdate={props.handleTodoUpdate}
              handleTodoRemove={props.handleTodoRemove}
              handleTodoComplete={props.handleTodoComplete}
              handleTodoBlur={props.handleTodoBlur}
            />
          </li>
        ))}
      </ul>
      <div className="list-buttons">
        <button onClick={() => props.showAllItems()}>All</button>
        <button onClick={() => props.showActiveItems()}>Active</button>
        <button onClick={() => props.showCompletedItems()}>Completed</button>
      </div>
    </div>
  )
}

export default TodoList
