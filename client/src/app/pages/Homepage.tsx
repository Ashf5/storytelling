

import StoryList from "../components/StoryList";
import { useAppSelector } from "../features/store";


const Homepage: React.FC = () => {

    const token = useAppSelector((state) => state.user.accessToken);

    return (
        <div>
            <h3>Stories</h3>
            <StoryList />
        </div>
    )
}

export default Homepage;