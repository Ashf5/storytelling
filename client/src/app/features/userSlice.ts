
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {userState} from '../../../../types/types.ts'
import type { RootState } from "./store.ts";

const baseURL = import.meta.env.VITE_BASE_URL;


const initialState: userState = {accessToken: null, authored: [], contributed: []};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        addAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    },
    // TODO take care of all the stages....
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
        })
        .addCase(getUserStoriesThunk.fulfilled, (state, action) => {
            state.authored = action.payload?.authored || [];
            state.contributed = action.payload?.contributed || [];
        })
    
    }
})



// A thunk for refreshing token
export const refreshToken = createAsyncThunk(
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

// A thunk for registering and getting accessToken
export const registerUser = createAsyncThunk<{msg: string, accessToken: string}, {username: string, email:string, password:string}>(
    'user/registerUser',
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

export const loginUser = createAsyncThunk<{accessToken:string}, {email:string, password:string}>(
    'user/loginUser',
    async (user) => {
        const response = await fetch(baseURL + '/login', {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    }
)


// update state with the contributed and authored id's
export const getUserStoriesThunk = createAsyncThunk(
    // TODO finish the updating of getting the user stories
    'user/userStories',
    async (_, {getState}) => {
        const state = getState() as RootState;
        const accessToken = state.user.accessToken;
        const response = await fetch(baseURL + '/stories/permission', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken ?? ''
            },
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json()
            return data;
        }
    }
)




export default userSlice.reducer;
export const {addAccessToken} = userSlice.actions;