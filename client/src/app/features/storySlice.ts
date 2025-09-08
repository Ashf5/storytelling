import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Story } from "../../../../types/types";
import type {RootState} from './store.ts';

const baseURL = import.meta.env.VITE_BASE_URL;

// Initialize with an empty list of books.
const initialState: {stories:Story[]} = {stories:[]};

const storySlice = createSlice({
    name: 'storySlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getBooksThunk.fulfilled, (state, action) => {
            state.stories = action.payload;
        })
    }
})


// Fetches all the books
export const getBooksThunk = createAsyncThunk(
    'stories/getBooks',
    async (_, {getState}) => {
        const state = getState() as RootState;
        const accessToken = state.user.accessToken;
        if (!accessToken) {
            throw new Error ('No access token provided')
        }
        const response = await fetch(baseURL + '/stories', {
            method: 'GET',
            headers: {'authorization': accessToken},
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
)

export default storySlice.reducer;