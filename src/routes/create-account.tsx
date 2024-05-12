import { useState } from "react";
import { styled } from "styled-components";

const Title = styled.h1``;
;
const Wrapper = styled.div``;
const Form = styled.form``;
const Input = styled.input``;

export default function CreateAccounte() {
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        switch (name) {
            case "name":
                setName(value);
                break;
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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Create an account
            // set the name of the user.
            // redirect to the home page
        } catch (e) {
            // setError
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Title>Log into ☁</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required />
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
                <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
            </Form>
        </Wrapper>
    );
}