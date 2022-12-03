import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { userLogin } from "../Store/apiSlice";
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
  width: 30%;
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
  justify-content: center;
  flex-direction: column;
`;
const Input = styled.input`
  /* flex: 1; */
  width: 95%;
  /* margin: 10px 10px 10px 0; */
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  color: black;
  font-size: 20px;
  font-weight: 700;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 30px 0px rgba(112, 112, 112, 1);
  border: 0.5px solid lightgray;
  margin: 10px 0px;
  &:hover {
    background-color: black;
    border: 0.5px solid black;
    transition: all ease-out 0.3s;
    color: white;
  }
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin-top: 5px;
  font-size: 15px;
  text-decoration: dashed;
  color: black;
  cursor: pointer;
  &:visited {
    color: lightgray;
  }
`;

const Error = styled.span`
  text-align: center;
  color: red;
`;

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    userLogin(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong</Error>}
          <Link target="blank" href="/forgot">
            Forgot password?
          </Link>
          <Link>Create a new account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
