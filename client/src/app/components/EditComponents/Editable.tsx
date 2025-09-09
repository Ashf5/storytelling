
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../features/store";
import { editStoryThunk } from "../../features/storySlice";

const Editable: React.FC<{numId:number}> = ({numId}) => {
    const dispatch = useAppDispatch();
    const story = useAppSelector((state) => state.stories.stories.find(item => item.id === numId));
    const navigate = useNavigate();
    
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const title = formData.get('title') as string;
            const content = formData.get('content') as string;
    
            await dispatch(editStoryThunk({id:numId, title, content}));
    
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

export default Editable;