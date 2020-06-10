import * as React from 'react'
import TodoItem from './todo-item'
import {TodoInterface} from '../interfaces'
import TodoForm from "./todo-form";
import {pushTodosAction} from "../actions";

interface TodoListProps {
  listTitle: string;
  store: any;
}

class TodoList extends React.Component<TodoListProps, {}> {

  filteredTodos: TodoInterface[];
  todos: TodoInterface[];
  listTitle: string;
  store: any;

  constructor(props: any) {
    super(props);
    this.listTitle = props.listTitle;
    this.store = props.store;
    this.todos = [];
    this.filteredTodos = this.todos;

    this.store.subscribe(this.handleChange);
  }

  handleChange = () => {
    const currentValue = this.store.getState();
    if (currentValue) {
      this.todos = currentValue;
      this.showAllItems();
    }
  }

  handleTodoCreate = (todo: TodoInterface) => {
    const newTodosState: TodoInterface[] = [...this.todos]
    newTodosState.unshift(todo);
    this.updateLists(newTodosState);
  }

  handleTodoUpdate = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newTodosState: TodoInterface[] = [...this.todos];
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target.value;
    this.updateLists(newTodosState);
  }

  handleTodoRemove = (id: string) => {
    const newTodosState: TodoInterface[] = this.todos.filter((todo: TodoInterface) => todo.id !== id);
    this.updateLists(newTodosState);
  }

  handleTodoComplete = (id: string) => {
    const newTodosState: TodoInterface[] = [...this.todos]
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted
    this.updateLists(newTodosState);
  }

  showAllItems = () => {
    this.filteredTodos = [...this.todos];
    this.forceUpdate();
  }

  showCompletedItems = () => {
    this.filteredTodos = this.todos.filter(todo => todo.isCompleted);
    this.forceUpdate();
  }

  showActiveItems = () => {
    this.filteredTodos = this.todos.filter(todo => !todo.isCompleted);
    this.forceUpdate();
  }

  updateLists = (list: TodoInterface[]) => {
    this.todos = list;
    this.filteredTodos = [...list];
    this.pushList();
    this.forceUpdate();
  }

  handleTodoBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      event.target.classList.add('todo-input-error')
    } else {
      event.target.classList.remove('todo-input-error')
    }
  }

  pushList = () => {
    this.store.dispatch(pushTodosAction(this.todos));
  }


// TodoList component
  render = () => {
    return (
      <div className="todo-list">
        <h2>{this.listTitle}</h2>
        <TodoForm
          todos={this.todos}
          handleTodoCreate={this.handleTodoCreate}
        />
        <ul>
          {this.filteredTodos.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                handleTodoUpdate={this.handleTodoUpdate}
                handleTodoRemove={this.handleTodoRemove}
                handleTodoComplete={this.handleTodoComplete}
                handleTodoBlur={this.handleTodoBlur}
              />
            </li>
          ))}
        </ul>
        <div className="list-buttons">
          <button onClick={() => this.showAllItems()}>All</button>
          <button onClick={() => this.showActiveItems()}>Active</button>
          <button onClick={() => this.showCompletedItems()}>Completed</button>
        </div>
      </div>
    )
  }
}

export default TodoList
