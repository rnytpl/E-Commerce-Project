import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  max-width: 550px;
  height: 350px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* background-color: #f5fbfd; */
  position: relative;
  &:hover ${Info} {
    transition: all 1s ease-out;
    opacity: 1;
  }
  ${mobile({
    height: "50vh",
  })}
  overflow: hidden;
`;

const Circle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  ${mobile({
    height: "70%",
  })}
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Link to={`/products/${item._id}`}>
          <Icon>
            <SearchOutlined />
          </Icon>
        </Link>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
