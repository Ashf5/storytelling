import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/store";
import { getBooksThunk } from "../features/storySlice";
import StoryCard from "./StoryCard";

const StoryList: React.FC = () => {
    const stories = useAppSelector((state) => state.stories.stories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBooksThunk());
    }, [])



    return (
        <div>
            {stories.map(item => <StoryCard story={item} key={item.id}/>)}
        </div>
    )
}

export default StoryList;