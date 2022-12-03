import React from "react";
import styled from "styled-components";
import Announcements from "../Components/Announcements";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Product from "../Components/Product";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useGetAllProductsQuery } from "../Store/apiSlice";

const Container = styled.div`
  width: 100vw;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    justifyContent: "center",
  })}
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({
    margin: "0px",
    display: "flex",
    flexDirection: "column",
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  ${mobile({
    marginBottom: "10px",
  })}
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({
    padding: "8px",
    marginBottom: "10px",
  })}
`;

const Option = styled.option`
  margin-right: 20px;
`;

const AllProductsPage = () => {
  const { search } = useLocation();
  const category = search.split("=")[1];
  const { data, error, isLoading } = useGetAllProductsQuery(category);

  if (isLoading) {
    return <h1>Loading..</h1>;
  } else if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Container>
      <Navbar />
      <Announcements />
      <Title />
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color">
            <Option>Color</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size">
            <Option disabled defaultValue>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select name="sort">
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <ProductContainer>
        {data.map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </ProductContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default AllProductsPage;
