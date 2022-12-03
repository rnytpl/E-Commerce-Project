import React from "react";
import Announcements from "../Components/Announcements";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Products from "../Components/Products";
import Slider from "../Components/Slider";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const HomePage = () => {
  return (
    <Container>
      <Announcements />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default HomePage;
