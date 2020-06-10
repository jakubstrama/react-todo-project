import * as React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import TodoList from './components/todo-list'
import './styles/styles.css'
import todosReducer from './reducers/todos.reducer';


const store = createStore(todosReducer)

class TodoListApp extends React.Component<{}, {}> {

  render = () => {
    return <div className="todo-list-app">
      <TodoList listTitle={'Todo list 1'} store={store} />
      <TodoList listTitle={'Todo list 2'} store={store} />
    </div>
  }
}

render(
  <Provider store={store}>
    <TodoListApp/>
  </Provider> ,
  document.getElementById('root')
);
