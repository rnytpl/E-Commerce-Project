import React from "react";
import { UserLogin } from "./UserLogin";
import styled from "styled-components";

const LoginWrapper = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=740&t=st=1668809127~exp=1668809727~hmac=84fb6931687019a624edc7f4e5ebfb32c4ed9d81c13eed6e776c3558fb73aa6b")
    no-repeat center center fixed;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginModal = () => {
  return (
    <LoginWrapper>
      <UserLogin />
    </LoginWrapper>
  );
};
