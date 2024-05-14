import { auth } from "../firebase";

export default function Home() {
    const logOut = () => {
        auth.signOut();
    };

    return (
        <h1>
            This is main Home<br/>
            <button onClick={logOut}>Logout</button>
        </h1>
    );
}