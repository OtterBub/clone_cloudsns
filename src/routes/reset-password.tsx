import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Wrapper, Title, Form, Input, Switcher, Error } from "../components/auth-components";
import GithubButton from "../components/github-btn";
import Timer from "../util/timer";

// const errors = {
//     "auth/email-already-in-use": "That email already exists."
// };


export default function ResetPassword() {
    const [isLoading, setLoading] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (seconds === 0) {
            // Timer has expired
            clearInterval(interval!);
        } else {
            interval = setInterval(() => {
                console.log("timer");
                setSeconds(seconds - 1);
            }, 1000);
        }
        return () => clearInterval(interval!);
    }, [seconds]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            default:
                break;
        }
    };

    const onReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "") return;
        try {
            setLoading(true);

            await sendPasswordResetEmail(auth, email)

            setSeconds(10);
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
            <Title>Reset Password ☁</Title>
            <Form onSubmit={onReset}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
                <Input
                    disabled={email.length < 1 || seconds > 0}
                    type="submit"
                    value={`${isLoading ? "Loading..." : (seconds > 0) ? `Wating... ${seconds}` : "Reset Password"} `}
                />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Already have an account? {" "}
                <Link to="/Login">Log in &rarr;</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>
    );
}