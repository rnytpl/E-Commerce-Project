import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcements";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../Store/apiSlice";
import { cartActions } from "../Store/cartSlice";
import { useDispatch } from "react-redux";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    padding: "20px 15px",
    height: "80vh",
    overflow: "hidden",
  })}
`;
const ImgContainer = styled.div`
  flex: 1;
  ${mobile({
    width: "50vh",
  })}
`;
const Image = styled.img`
  width: 50vw;
  height: 70vh;
  object-fit: cover;
  ${mobile({
    height: "100%",
  })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({
    height: "100%",
    padding: "0px 15px",
    width: "50vh",
  })}
`;
const Title = styled.h1`
  font-weight: 300;
  ${mobile({
    fontWeight: "500",
    fontSize: "20px",
    width: "100%",
  })}
`;
const Desc = styled.p`
  margin: 20px 0px;
  ${mobile({
    width: "40vw",
    margin: "15px 0px 15px 0px",
    fontSize: "15px",
  })}
`;
const Price = styled.span`
  font-weight: 200;
  font-size: 40px;
  ${mobile({
    fontSize: "20px",
  })}
`;

const FilterContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0px;
  ${mobile({
    flexDirection: "column",
    margin: "10px 0px",
  })}
`;
const Filter = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
  text-align: center;
  ${mobile({
    margin: "15px 0px",
    width: "300px",
  })}
`;
const FilterTitle = styled.span`
  margin-right: 0.6rem;
  font-weight: 200;
  font-size: 20px;
  ${mobile({
    fontSize: "20px",
  })}
`;
const FilterColor = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 0.3rem;
`;
const FilterSize = styled.select`
  margin: auto;
  text-align: center;
  width: 45px;
`;
const FilterSizeOption = styled.option`
  font-weight: 200;
  font-size: 15px;
  ${mobile({
    fontSize: "15px",
  })}
`;
const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const AddWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Amount = styled.span`
  border: 1px solid teal;
  text-align: center;
  width: 15px;
  padding: 5px;
  border-radius: 5px;
`;
const AddToCart = styled.button`
  color: teal;
  padding: 10px;
  border: 1px solid teal;
  border-radius: 5px;
  background-color: transparent;
  &:hover {
    background-color: teal;
    color: white;
  }
  ${mobile({
    width: "150px",
    margin: "15px 0px",
    padding: "5px",
  })}
`;

const warningShake = keyframes`
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

const Warning = styled.span`
  color: red;
  margin-top: 0.3rem;
  animation: ${warningShake} 1s;
  animation-iteration-count: 1;
`;

const Product = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [clr, setColor] = useState();
  const [sz, setSize] = useState();
  const [warning, setWarning] = useState(false);

  const handleQuantity = (operation) => {
    operation === "decrease" && quantity > 1 && setQuantity(quantity - 1);
    operation === "increase" && quantity <= 4 && setQuantity(quantity + 1);
  };

  // Gets fired when an item is added to cart
  const cartHandler = () => {
    if (!clr || !sz) {
      setWarning(true);
    } else {
      dispatch(cartActions.addProduct({ data, quantity, clr, sz }));
      navigate("/cart");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={data.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{data.title}</Title>
          <Desc>{data.desc}</Desc>
          <Price>{data.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color: </FilterTitle>
              {data.color.map((c) => (
                <FilterColor color={c} onClick={() => setColor(c)} key={c} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size:</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                <FilterSizeOption key={"-"}>-</FilterSizeOption>
                {data.size.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AddWrapper>
              <Remove onClick={() => handleQuantity("decrease")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("increase")} />
              <AddToCart onClick={() => cartHandler()}>Add to Cart</AddToCart>
            </AddWrapper>
            {warning && <Warning>Choose color and size</Warning>}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
