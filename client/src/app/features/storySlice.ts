import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Story } from "../../../../types/types";
import type {AppDispatch, RootState} from './store.ts';
import { useFetch } from "./useFetch.ts";

const baseURL = import.meta.env.VITE_BASE_URL;

// Initialize with an empty list of books.
const initialState: {stories:Story[]} = {stories:[]};

const storySlice = createSlice({
    name: 'storySlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //TODO add other stages
        // TODO add checks to make sure that response was ok
        builder.addCase(getStoriesThunk.fulfilled, (state, action) => {
            state.stories = action.payload;
        })
        .addCase(editStoryThunk.fulfilled, () => {
            alert('successful!')
        })
        .addCase(createStoryThunk.fulfilled, () => {
            alert('story added')
        })
    }
})


// Fetches all the books
export const getStoriesThunk = createAsyncThunk(
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
        return data;
    }
)

// thunk for editing book
export const editStoryThunk = createAsyncThunk<{msg:string}, {id: number | string, title:string, content:string}>(
    'stories/editBook',
    async (edited, {getState}) => {
        const state = getState() as RootState;
        const accessToken = state.user.accessToken;
        if (!accessToken) throw new Error('missing access token');
        await fetch(`${baseURL}/stories/${edited.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'authorization': accessToken},
            body: JSON.stringify(edited),
            credentials: 'include'
        })

        return {msg: 'success'}
    }
)

export const createStoryThunk = createAsyncThunk<{msg:string}, {title:string, content:string}>(
    'stories/createBook',
    async (story, {getState}) => {
        // get access token
        const state = getState() as RootState;
        const accessToken = state.user.accessToken;
        if (!accessToken) throw new Error('missing access token');

        const response = await fetch(baseURL + '/stories', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'authorization': accessToken},
            body: JSON.stringify(story),
            credentials: 'include'
        })

        if (!response.ok) throw new Error('Something went wrong while creating new book')

        return {msg: 'success'}
    }

)

export default storySlice.reducer;