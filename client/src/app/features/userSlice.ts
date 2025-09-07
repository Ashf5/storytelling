
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {userState} from '../../../../types/types.ts'

const baseURL = import.meta.env.VITE_BASE_URL;

const refreshToken = createAsyncThunk(
    'user/refreshToken',
    async () => {
        const response = await fetch(baseURL + '/refresh', {
            method:"POST"
        });
        if (!response.ok) throw new Error('An error occured while refreshing token');
        const data = await response.json();
        return data;

    }
)


export const createToken = createAsyncThunk<{msg: string, accessToken: string}, {username: string, email:string, password:string}>(
    'user/createToken',
    async (user) => {
        const response = await fetch(baseURL + '/register', {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
            credentials: 'include'
        });
        if (!response.ok) throw new Error('An error occured while creating token');
        const data = await response.json();
        return data;
    }
)


const initialState: userState = {accessToken: null};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        addAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken
        })
    }
})

export default userSlice.reducer;
export const {addAccessToken} = userSlice.actions;