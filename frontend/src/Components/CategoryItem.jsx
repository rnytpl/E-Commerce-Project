import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  margin-right: 1rem;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 20px;
  ${mobile({
    // width: "20vw",
    height: "30vh",
    margin: "10px 0px",
  })}
`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 1rem;
`;
const Button = styled.div`
  background-color: white;
  opacity: 0.5;
  font-size: large;
  font-weight: 700;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  color: black;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products?category=${item.categories}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Shop Now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
