import { Send } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 1rem;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 1rem;
  ${mobile({
    textAlign: "center",
  })}
`;
const InputContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 50%;
  /* height: 40px; */
  /* border: 1px solid lightgray; */
`;
const Input = styled.input`
  margin: 0px 10px 0px;
  flex: 11;
  padding: 10px;
  /* border: 1px solid lightgray; */
`;
const Button = styled.button`
  flex: 1;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  padding: 9px;
  margin: 0px;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
