import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  todos: string[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    setTodos: (state, action: PayloadAction<string[]>) => {
      state.todos = action.payload;
    },
    deleteTodos: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (
      state,
      action: PayloadAction<{ index: number; text: string }>
    ) => {
      const { index, text } = action.payload;
      state.todos[index] = text;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, setTodos, deleteTodos, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
