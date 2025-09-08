import { Link } from "react-router-dom"
import type { Story } from "../../../../types/types"

const StoryCard:React.FC<{story:Story}> = ({story}) => {

    return (
        <Link to={`/stories/${story.id}`} >
            <div>
                <h3>{story.title}</h3>
                <p>Author: {story.author_id}</p>
            </div>
        </Link>
        
    )
}

export default StoryCard;