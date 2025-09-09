import { useAppSelector, useAppDispatch } from "./store";

type fetchArgs = {
    url:string,
    method: string,
    body?:{},
    accessToken:string
}


// hook to use fetch that will automatically try to refresh
export const useFetch = (args:fetchArgs) => {

}