
import { useAppDispatch } from "../features/store";
import { createToken } from "../features/userSlice";

const RegisterForm = () => {

    const dispatch = useAppDispatch();    

    const handleRegister = (e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;


        dispatch(createToken({username, email, password}))


    }

    return (
        <form onSubmit={handleRegister}>
            <input type="text" name="username" placeholder="Username" required/>
            <input type="email" name="email" placeholder="Email" required/>
            <input type="password" name="password" placeholder="Password" required />
            <input type="submit" value="Register" />
        </form>
    )
}

export default RegisterForm;