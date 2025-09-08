import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/store";
import type { FormEvent } from "react";
import { editBookThunk } from "../features/storySlice";

const EditStory: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // get id paramater
    const {id} = useParams<{id:string}>();
    const numId = Number(id);
    if (!numId) throw new Error('invalid id provided')

    const story = useAppSelector((state) => state.stories.stories.find(item => item.id === numId));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        await dispatch(editBookThunk({id:numId, title, content}));

        navigate('/');

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title: </label>
                <input type="text" name="title" defaultValue={story?.title} />
                <br />
                <label htmlFor="content">Content: </label>
                <textarea name="content" defaultValue={story?.content} />
                <input type="submit" value="save changes" />
            </form>
        </div>
    )
}

export default EditStory;