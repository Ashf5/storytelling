import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/store";
import Editable from "../components/EditComponents/Editable";
import ViewOnly from "../components/EditComponents/ViewOnly";
import AuthorEdit from "../components/EditComponents/AuthorEdit";



// Returns the edit page
const EditStory: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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