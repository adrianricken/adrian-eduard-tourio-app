import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import { useRouter } from "next/router.js";
import useSWR from "swr";

export default function Comments({ locationName }) {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(`/api/places/${id}`);

  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 0.5rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  async function handleSubmitComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const commentData = Object.fromEntries(formData);
    const response = await fetch(`/api/places/${id}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
      mutate();
      e.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  const comments = data?.comments;

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && comments.length > 0 ? (
        <>
          <h1>
            {`${comments.length} fan${
              comments.length === 1 ? "" : "s"
            } commented on this place:`}
          </h1>
          {comments.map(({ _id, name, comment }) => (
            <div key={_id}>
              <p>
                <strong>{name}</strong> commented on {locationName}
              </p>
              <span>{comment}</span>
            </div>
          ))}
        </>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </Article>
  );
}
