

import { Link, useNavigate } from "react-router-dom";
import StoryList from "../components/StoryList";
import { useAppSelector } from "../features/store";
import { useEffect } from "react";


const Homepage: React.FC = () => {

    const navigate = useNavigate();
    const token = useAppSelector((state) => state.user.accessToken);

    // use effect to redirect if no token
    useEffect(() => {
        if (token === null) navigate('/login');
    }, [token, navigate]);
    
    if (token === null) return null;

    return (
        
        <div>
            <Link to={'/stories'}>Create Story</Link>
            <h3>Stories</h3>
            <StoryList />
        </div>
    )
}

export default Homepage;