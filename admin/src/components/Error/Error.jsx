import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

const errorShake = keyframes`
0% { transform: translate(1px, 1px) rotate(0deg); }
10% { transform: translate(-1px, -2px) rotate(-1deg); }
20% { transform: translate(-3px, 0px) rotate(1deg); }
30% { transform: translate(3px, 2px) rotate(0deg); }
40% { transform: translate(1px, -1px) rotate(1deg); }
50% { transform: translate(-1px, 2px) rotate(-1deg); }
60% { transform: translate(-3px, 1px) rotate(0deg); }
70% { transform: translate(3px, 1px) rotate(-1deg); }
80% { transform: translate(-1px, -1px) rotate(1deg); }
90% { transform: translate(1px, 2px) rotate(0deg); }
100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const ErrorContainer = styled.div`
  color: red;
  animation: ${errorShake} 1s;
`;

export const Error = () => {
  const { error } = useSelector((state) => state.user);
  useEffect(() => {}, [error]);
  return <ErrorContainer>{error}</ErrorContainer>;
};
