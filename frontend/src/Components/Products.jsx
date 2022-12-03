import React from "react";
import Product from "./Product";
import styled from "styled-components";
import { useGetAllProductsQuery } from "../Store/apiSlice";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Products = ({ filters, sort }) => {
  // const [skip, setSkip] = useState(false);
  const { search } = useLocation();
  const category = search.split("=")[1];

  const { data, error, isLoading } = useGetAllProductsQuery(category);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <h1>{error}</h1>;
  }


  return (
    <Container>
      {data.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
