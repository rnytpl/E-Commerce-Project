import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("./images/fashion.jpg") center;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 40%;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 9px 13px 24px -2px rgba(112, 112, 112, 1);
  ${mobile({
    width: "60%",
  })}
`;
const Title = styled.h1`
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px 10px 0;
  padding: 10px;
`;
const Agreement = styled.span`
  margin: 10px 0;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  color: black;
  font-size: 20px;
  font-weight: 700;
  background-color: white;
  border-radius: 5px;
  box-shadow: 9px 13px 24px -2px rgba(112, 112, 112, 1);
  border: 0.5px solid lightgray;
  &:hover {
    background-color: black;
    border: 0.5px solid black;
    transition: all ease-out 0.3s;
    color: white;
  }
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form>
          <Input placeholder="Name" />
          <Input placeholder="Last name" />
          <Input placeholder="Email" />
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
