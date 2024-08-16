import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  todos: [{ id: 1, text: 'Create a Todo and edit with ease' }]
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: { // properties and the functionalities which we want to provide (functions)
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload
      }
      state.todos.push(todo) // pushing the new todo to the state
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          todo.text = action.payload.text
        }
        return todo
      })
    }
  }
})

export const { addTodo, removeTodo, updateTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer