import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TODOS_URL = "https://670a3e0aaf1a3998baa376c4.mockapi.io/todos";

const initialState = {
    todos: [],
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await axios.get(TODOS_URL);
    return response.data;
});

export const addNewTodos = createAsyncThunk(
    "todos/addNewTodos",
    async (initialTodo) => {
        const response = await axios.post(TODOS_URL, initialTodo);
        return response.data;
    }
);

export const editTodoItem = createAsyncThunk(
    "todos/editTodoItem",
    async (initialTodo) => {
        const response = await axios.put(
            `${TODOS_URL}/${initialTodo.id}`,
            initialTodo
        );
        return response.data;
    }
);

export const removeToDoItem = createAsyncThunk(
    "todos/editTodoItem",
    async (id) => {
        const response = await axios.delete(`${TODOS_URL}/${id}`);
        return response.data;
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
        });
        builder.addCase(editTodoItem.fulfilled, (state, action) => {
            const index = state.todos.findIndex(
                (todo) => todo.id === action.payload.id
            );
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        });
    },
});

export const selectTodos = (state) => state.todos.todos;

export default todosSlice.reducer;
