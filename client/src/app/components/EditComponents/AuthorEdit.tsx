import { useAppSelector } from "../../features/store";
import Editable from "./Editable";

const baseURL = import.meta.env.VITE_BASE_URL;



const AuthorEdit: React.FC<{numId: number}> = ({numId}) => {
    const accessToken = useAppSelector(state => state.user.accessToken);

    // Handles adding new contributors
    const submitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('contributorEmail') as string;
        const body = JSON.stringify({email: email, story_id:numId})

        const response = await fetch(baseURL + '/contributors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken || '',
            },
            credentials: 'include',
            body
        });
        if (response.ok) {
            alert('Contributor Added!')
        }
        else {
            const data = await response.json()
            console.log(data)
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