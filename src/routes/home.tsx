import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";

const Wrapper = styled.span``;

export default function Home() {
    return (
        <Wrapper>
            <PostTweetForm />
        </Wrapper>
    );
}