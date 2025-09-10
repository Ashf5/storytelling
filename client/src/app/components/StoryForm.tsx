import type { FormEvent } from "react"
import { useAppDispatch } from "../features/store"
import { useNavigate } from "react-router-dom";
import { createStoryThunk } from "../features/storySlice";
import { getUserStoriesThunk } from "../features/userSlice";

const StoryForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        await dispatch(createStoryThunk({title, content}))
        // update state so that will have newest story
        await dispatch(getUserStoriesThunk())
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="title" />
            <textarea name="content" placeholder="content" />
            <input type="submit" value='create story' />
        </form>
    )
}

export default StoryForm;