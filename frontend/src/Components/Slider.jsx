import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive.js";

const Container = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({
    display: "none",
  })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f18f8f;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "30px"};
  right: ${(props) => props.direction === "right" && "30px"};
  cursor: pointer;
  margin: auto;
  opacity: 0.6;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 50px;
  max-width: 50%;
`;

const Title = styled.h1`
  padding: 1rem;
  width: 20rem;
  margin: auto;
`;

const Desc = styled.p`
  padding: 1rem;
  width: 20rem;
  margin: auto;
`;
const Button = styled.button`
  margin-bottom: 1rem;
  font-weight: bold;
  padding: 1rem;
  background-color: transparent;
  border: none;
  width: 10rem;
  margin: auto;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      // If 2nd or 3rd slide is displayed on screen
      // set its index to either 1 or two which will display the slide image based on its number
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      // if slideIndex is smaller than 2, which means either first or second image is showing
      // increment index by one or set it equal to 0
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIosOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIosOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
