import { useParams } from "react-router-dom";
import {  useAppSelector } from "../features/store";
import Editable from "../components/EditComponents/Editable.tsx";
import ViewOnly from "../components/EditComponents/ViewOnly.tsx";
import AuthorEdit from "../components/EditComponents/AuthorEdit.tsx";



// Returns the edit page
const EditStory: React.FC = () => {
    // get stories that authored or a contributor.
    const authored = useAppSelector(state => state.user.authored);
    const contributed = useAppSelector(state => state.user.contributed);

    // get id paramater
    const {id} = useParams<{id:string}>();
    const numId = Number(id);
    if (!numId) throw new Error('invalid id provided')

    return (
        // Return appropriate component based on role
        <>
        {
            authored.includes(numId) && <AuthorEdit numId={numId} />
        }
        {
            contributed.includes(numId) && <Editable numId={numId} /> 
        }
        {
            !contributed.includes(numId) && !authored.includes(numId) && <ViewOnly numId={numId} />
        }
        
        </>
        
    )
}

export default EditStory;