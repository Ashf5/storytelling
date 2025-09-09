import { Link } from "react-router-dom";
import { useAppSelector } from "../../features/store";



const ViewOnly: React.FC<{numId:number}> = ({numId}) => {
    const story = useAppSelector((state) => state.stories.stories.find(item => item.id === numId));
    
        
    
        return (
            <div>
                <Link to={'/'}>Back</Link>
                <h3>{story?.title}</h3>
                <p>{story?.content}</p>
            </div>
        )
}

export default ViewOnly;