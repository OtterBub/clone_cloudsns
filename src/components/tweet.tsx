import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
`;
const Column = styled.div`

`;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
    margin: 10px;
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;
const Payload = styled.p`
    margin:  10px 0px;
    font-size: 18px;
    word-break: break-all;
`;

const RedButton = styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`;

const BlueButton = styled.button`
    background-color: #007bff;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder {
        font-size: 16px;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
    const user = auth.currentUser;
    const [isEdit, setEdit] = useState(false);
    const [editTweet, setEditTweet] = useState("");

    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this tweet?")
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "tweets", id));
            if (photo) {
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`)
                await deleteObject(photoRef);
            }
            console.log("Tweet deleted");

        } catch (e) {
            console.error(e);
        } finally {

        }
    }

    const onEdit = async () => {
        if (user?.uid !== userId) return;
        setEdit(true);
        setEditTweet(tweet);
    }

    const onEditSave = async () => {
        if (user?.uid !== userId) return;
        try {
            updateDoc(doc(db, "tweets", id), {
                tweet: editTweet
            });

            // if (photo) {
            //     const photoRef = ref(storage, `tweets/${user.uid}/${id}`)
            //     await deleteObject(photoRef);
            // }

        } catch (e) {
            console.error(e);
        } finally {
            setEdit(false);
            setEditTweet("");
        }
    }

    const onEditCancle = async () => {
        setEdit(false);
        setEditTweet("");
    }
    console.log(`photo ${photo}`);
    if (isEdit) {
        return (
            <Wrapper>
                <Column>
                    <Username>{username}</Username>
                    <TextArea
                        rows={5}
                        maxLength={180}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setEditTweet(e.target.value); }}
                        value={editTweet}
                    />
                    {user?.uid === userId ? <RedButton onClick={onEditCancle}>Cancle</RedButton> : null}
                    {user?.uid === userId ? <BlueButton onClick={onEditSave}>Save</BlueButton> : null}
                </Column>
                {photo !== undefined ?
                    <Column>
                        <Photo src={photo} />
                    </Column> : null}
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <Column>
                    <Username>{username}</Username>
                    <Payload>{tweet}</Payload>
                    {user?.uid === userId ? <RedButton onClick={onDelete}>Delete</RedButton> : null}
                    {user?.uid === userId ? <BlueButton onClick={onEdit}>Edit</BlueButton> : null}
                </Column>
                {photo !== undefined ?
                    <Column>
                        <Photo src={photo} />
                    </Column> : null}
            </Wrapper>
        );
    }


}