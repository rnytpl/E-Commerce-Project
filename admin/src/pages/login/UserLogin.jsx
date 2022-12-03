import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../store/apiSlice";
import styled from "styled-components";
import { Error } from "../../components/Error/Error";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2c2a2a47;
  border-radius: 5%;
  padding: 2rem;
`;

const Input = styled.input`
  margin-bottom: 0.5rem;
  padding: 10px;
  font-size: 26px;
  border: 0px;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 26px;
  margin-bottom: 0.5rem;
  border: 0px;
  border-radius: 5px;
  &:hover {
    background-color: black;
    color: white;
  }
  transition: all 0.3s ease;
`;

export const UserLogin = () => {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    userApi(dispatch, { username, password });
  };

  return (
    <LoginContainer>
      <Input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={(e) => handleClick(e)}>Login</Button>
      {error && <Error />}
    </LoginContainer>
  );
};
