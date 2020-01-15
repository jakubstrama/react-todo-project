import * as React from 'react'
import { render } from 'react-dom'
import TodoForm from './components/todo-form'
import TodoList from './components/todo-list'
import { TodoInterface } from './interfaces'
import './styles/styles.css'

class TodoListApp extends React.Component<{}, { todos: TodoInterface[] }> {
  filteredTodos: TodoInterface[];

  constructor(props: any) {
    super(props);

    this.state = { todos: [] };
    this.filteredTodos = [...this.state.todos];
  }

  handleTodoCreate = (todo: TodoInterface) => {
    const newTodosState: TodoInterface[] = [...this.state.todos]
    newTodosState.unshift(todo);
    this.updateLists(newTodosState);
  }

  handleTodoUpdate = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newTodosState: TodoInterface[] = [...this.state.todos];
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target.value;
    this.updateLists(newTodosState);
  }

  handleTodoRemove = (id: string) => {
    const newTodosState: TodoInterface[] = this.state.todos.filter((todo: TodoInterface) => todo.id !== id);
    this.updateLists(newTodosState);
  }

  handleTodoComplete = (id: string) => {
    const newTodosState: TodoInterface[] = [...this.state.todos]
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted
    this.updateLists(newTodosState);
  }

  showAllItems = () => {
    this.filteredTodos = [...this.state.todos];
    this.forceUpdate();
  }

  showCompletedItems = () => {
    this.filteredTodos = this.state.todos.filter(todo => todo.isCompleted);
    this.forceUpdate();
  }

  showActiveItems = () => {
    this.filteredTodos = this.state.todos.filter(todo => !todo.isCompleted);
    this.forceUpdate();
  }

  updateLists = (list: TodoInterface[]) => {
    this.setState({ todos: list });
    this.filteredTodos = [...list];
    this.forceUpdate();
  }

  handleTodoBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      event.target.classList.add('todo-input-error')
    } else {
      event.target.classList.remove('todo-input-error')
    }
  }

  render = () => {
    return <div className="todo-list-app">
      <TodoForm
        todos={this.state.todos}
        handleTodoCreate={this.handleTodoCreate}
      />

      <TodoList
        todos={this.filteredTodos}
        handleTodoUpdate={this.handleTodoUpdate}
        handleTodoRemove={this.handleTodoRemove}
        handleTodoComplete={this.handleTodoComplete}
        handleTodoBlur={this.handleTodoBlur}
        showAllItems={this.showAllItems}
        showCompletedItems={this.showCompletedItems}
        showActiveItems={this.showActiveItems}
      />
    </div>
  }
}

render(<TodoListApp />, document.getElementById('root'));
