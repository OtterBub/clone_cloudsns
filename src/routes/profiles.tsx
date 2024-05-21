import { styled } from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div``;
const AvatarUpload = styled.div``;
const AvatarImg = styled.img``;
const AvatarInput = styled.input``;
const Name = styled.div``;

export default function Profile() {
    const user = auth.currentUser;

    return (
        <Wrapper>
            <AvatarUpload>
                <AvatarImg />
            </AvatarUpload>
            <AvatarInput type="file" accept="image/*" />
            <Name>
                {user?.displayName ?? "Anonymous"}
            </Name>
        </Wrapper>

    );
}