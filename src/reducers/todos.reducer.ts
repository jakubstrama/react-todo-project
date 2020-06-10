import {TodoInterface} from "../interfaces";

// @ts-ignore
const todosReducer = (state: TodoInterface[] = [], {type, payload}) => {
  switch (type) {
    case 'PUSH_TODOS':
      return payload
    default:
      return state
  }
}

export default todosReducer
