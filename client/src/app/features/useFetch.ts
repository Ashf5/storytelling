
import {type AppDispatch } from "./store";
import { refreshToken } from "./userSlice";

type fetchArgs = {
    url:string,
    method: string,
    body?: string,
    accessToken:string | null
}


// TODO change to regular function. Can't use out of component.
// hook to use fetch that will automatically try to refresh
export const useFetch = async (dispatch:AppDispatch, {url, method, body, accessToken}:fetchArgs) => {
    let response: Response;
    try {
        response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken || ''
            },
            body: body ? body : undefined
        } );
        if (response.status === 403) {
            await dispatch(refreshToken())
            // Retry
            response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': accessToken || ''
                },
                body: body ? body : undefined
            });
            if (response.status === 403) {
                throw new Error('Couldn\'t refresh token')
            }
        }
        
        const data = await response.json();
        return data

    }
    catch(e) {
        return -1
    }
}