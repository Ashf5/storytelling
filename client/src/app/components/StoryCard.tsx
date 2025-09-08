import type { Story } from "../../../../types/types"

const StoryCard:React.FC<{story:Story}> = ({story}) => {

    return (
        <a href="/">
            <div>
                <h3>{story.title}</h3>
                <p>Author: {story.author_id}</p>
                
            </div>
        </a>
        
    )
}

export default StoryCard;