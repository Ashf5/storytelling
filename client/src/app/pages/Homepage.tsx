

import { useAppSelector } from "../features/store";


const Homepage: React.FC = () => {

    const token = useAppSelector((state) => state.user.accessToken);

    return (
        <div>
            <h3>Stories</h3>
            <p>{token ?? 'no token'}</p>
        </div>
    )
}

export default Homepage;