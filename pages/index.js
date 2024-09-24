import styled from "styled-components";
import Card from "../components/Card.js";
import useSWR from "swr";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";

const List = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  padding-left: 0;
  margin-bottom: 100px;
`;

const ListItem = styled.li`
  position: relative;
  width: calc(33.333333% - (40px / 3));
  @media screen and (max-width: 767px) {
    width: calc(50% - 10px);
  }
  @media screen and (max-width: 470px) {
    width: 100%;
  }
`;

const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
export default function Home() {
  const { data } = useSWR("/api/places", { fallbackData: [] });

  return (
    <>
      <List role="list">
        {data.map((place) => {
          return (
            <ListItem key={place._id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={`${place._id.$oid ?? place._id}`}
              />
            </ListItem>
          );
        })}
      </List>
      <Link href="/create" passHref legacyBehavior>
        <FixedLink>+ place</FixedLink>
      </Link>
    </>
  );
}
