import * as React from 'react'
import {render} from 'react-dom'
import TodoList from './components/todo-list'
import './styles/styles.css'

class TodoListApp extends React.Component<{}, {}> {

  render = () => {
    return <div className="todo-list-app">
      <TodoList listTitle={'Todo list 1'}/>
    </div>
  }
}

render(<TodoListApp/>, document.getElementById('root'));
