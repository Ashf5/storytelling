import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {

    return (
        <div>
            <LoginForm />
            <p>Not a member? <Link to='/register'>Register</Link></p>
        </div>
    )
}

export default Login;