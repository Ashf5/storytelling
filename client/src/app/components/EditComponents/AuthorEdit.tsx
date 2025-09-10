import { useAppDispatch, useAppSelector } from "../../features/store";
import { useFetch } from "../../features/useFetch";
import Editable from "./Editable";

const baseURL = import.meta.env.VITE_BASE_URL;



const AuthorEdit: React.FC<{numId: number}> = ({numId}) => {
    const accessToken = useAppSelector(state => state.user.accessToken);
    const dispatch = useAppDispatch()

    // Handles adding new contributors
    const submitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('contributorEmail') as string;
        const body = JSON.stringify({email: email, story_id:numId})
        
        //TODO test properly the useFetch, make sure it refreshes token, and then replace all fetches with
        const response = await useFetch(dispatch, {url: baseURL + '/contributors', method: 'Post', accessToken: accessToken || '', body: body});
        if (response !== -1) {
            alert('contributor added')
        }
    }

    return (
        <>
            <Editable numId={numId}/>
            <div>
                <h3>Add Contributor</h3>
                <form onSubmit={submitHandler}>
                    <input type="email" name="contributorEmail" placeholder="Contributor Email" required/>
                    <input type="submit" value='Add Contributor' />
                </form>
            </div>
        </>
    )
}

export default AuthorEdit;