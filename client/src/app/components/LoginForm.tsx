
import { useAppDispatch } from "../features/store";
import { useNavigate } from "react-router-dom";
import { getUserStoriesThunk, loginUser } from "../features/userSlice";

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        
        await dispatch(loginUser({email, password}));
        await dispatch(getUserStoriesThunk());
        // after registering, redirect to the homepage
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" value="Log In" />
        </form>
    )
}

export default LoginForm;