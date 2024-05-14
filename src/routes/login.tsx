import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Wrapper, Title, Form, Input, Switcher, Error } from "../components/auth-components";
import GithubButton from "../components/github-btn";

// const errors = {
//     "auth/email-already-in-use": "That email already exists."
// };

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "" || password === "") return;
        try {
            // change the loading state to true
            setLoading(true);

            // Create an account
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);


            // redirect to the home page
            navigate("/");

        } catch (e) {
            // Error
            // console.log(e);
            if (e instanceof FirebaseError) {
                setError(e.message);
            } else {
                setError("Unkown Error!");
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Title>Login ☁</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
                <Input type="submit" value={isLoading ? "Loading..." : "Login"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Don't have an account? {" "}
                <Link to="/create-account">Create one &rarr;</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>
    );
}