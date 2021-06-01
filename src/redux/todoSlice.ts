import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const response = await axios.get("/todo", {
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }).then((resp) => {
        return resp.data.alltodo;
    }).catch((error) => {
        console.log("Fetching Error: ", error)
    })
    return { response };
})

export interface Instate {
    todoId: number;
    title: string | undefined;
    completed: boolean | undefined;
}

export const addTodoAsync = createAsyncThunk<Instate, { title: string, }>(
    "/todos/addTodoAsync", async (payload) => {
        let data = new Date();
        return axios.post("/todo", {
            title: payload.title,
            todoId: data.getMilliseconds(),
            completed: false,
        }).then((resp) => {
            return resp.data.Item;
        }).catch((error) => {
            return error.message;
        });
    }
);

export const toggleCompleteAsync = createAsyncThunk<Instate, { todoId: number, completed: boolean }>(
    "/todos/toggleCompleteAsync",
    async (payload) => {
        return await axios
            .patch("/todo", {
                todoId: payload.todoId,
                updateKey: "completed",
                updateValue: payload.completed,
            })
            .then((resp) => {
                return resp.data.UpdatedAttributes.Attributes;
            })
            .catch((error) => {
                console.log("Error Checker", error);
            });
    }
);
export const deleteTodoAsync = createAsyncThunk<Instate, { todoId: number }>(
    "/todos/deleteTodoAsync",
    async (payload) => {
        return await axios
            .delete("/todo", {
                data: {
                    todoId: payload.todoId,
                },
            })
            .then((resp) => {
                return resp.data.Item.Attributes;
            })
            .catch((error) => {
                console.log("delete error :", error);
            });
    },
);

const todoSlice = createSlice({
    name: "todos",
    initialState: [] as Instate[],
    reducers: {},
    extraReducers: {
        [getTodosAsync.pending.toString()]: (state, action) => {
            console.log("Fetching Data...");
        },
        [getTodosAsync.fulfilled.toString()]: (state, action) => {
            console.log("Fetched Data Successfully!");
            return action.payload.response;
        },
        [addTodoAsync.fulfilled.type]: (state, action: PayloadAction<Instate>) => {
            state.push(action.payload);
            console.log(`New Todo "${action.payload.title}" Added`);
        },
        [toggleCompleteAsync.fulfilled.toString()]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.todoId === action.payload.todoId
            );
            state[index].completed = action.payload.completed;
            console.log(`${state[index].title} updated to ${state[index].completed ? "Completed" : "Incomplete"}`);
        },
        [deleteTodoAsync.fulfilled.toString()]: (state, action) => {
            console.log("Todo Deleted(todoId):", action.payload.todoId);
            return state.filter((todo) => todo.todoId !== action.payload.todoId);
        },
    }
});

export default todoSlice.reducer;

