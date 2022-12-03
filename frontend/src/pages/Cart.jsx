import { Add, Remove, Delete } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcements from "../Components/Announcements";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { cartActions } from "../Store/cartSlice";
import { mobile } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 38px;
  margin: auto;
  ${mobile({
    padding: "10px",
    width: "90vw",
  })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) => (props.type === "filled" ? "black" : "white")};
  color: ${(props) => props.type === "filled" && "white"};
  &:hover {
    background-color: transparent;
    color: black;
    /* border: 1px solid lightgray; */
    padding: 10px;
    transition: all 0.5s ease;
  }
`;
const TopTexts = styled.div`
  ${mobile({
    display: "none",
  })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  width: 80vw;
  margin: auto;
  align-items: center;
  ${mobile({
    flexDirection: "column",
  })}
`;

const Info = styled.div`
  flex: 2;
`;

const Product = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  ${mobile({
    padding: "10px",
  })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 25%;
  margin-right: 20%;
  object-fit: contain;
  ${mobile({
    marginRight: "5px",
    width: "40%",
  })}
`;

const Details = styled.div`
  height: 15vh;
  padding: 20px;
  margin-right: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  ${mobile({
    padding: "10px",
    marginRight: "0",
  })}
`;

const ProductName = styled.div``;
const ProductId = styled.div``;
const ProductColorContainer = styled.div`
  display: flex;
`;
const ProductColorLabel = styled.div`
  margin-right: 10px;
  font-weight: 700;
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
`;

const Amount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SummaryTitle = styled.h1`
  font-weight: 300;
  ${mobile({
    fontSize: "30px",
    marginBottom: "10px",
  })}
`;

const SummaryItem = styled.div`
  /* margin: 22px 0px; */
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const ButtonContainer = styled.div`
  text-align: center;
`;

const Button = styled.button`
  margin: auto;
  min-width: 50%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.type === "disabled" && "gray"};
`;

const Cart = () => {
  const dispatch = useDispatch();
  const { products, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const handleIncrement = (item) => {
    dispatch(cartActions.incrementQty(item));
  };

  const handleDecrement = (item) => {
    dispatch(cartActions.decrementQty(item));
  };

  const handleDelete = (item) => {
    dispatch(cartActions.deleteProduct(item));
  };

  return (
    <Container>
      <Navbar />
      <Announcements />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <StyledLink to="/products">
            <TopButton type="filled">CONTINUE SHOPPING</TopButton>
          </StyledLink>

          <TopTexts>
            <TopText>Shopping Bag({totalQuantity})</TopText>
            <TopText>Wishlist (0)</TopText>
          </TopTexts>
          {products.length >= 1 ? (
            <TopButton type="filled">CHECKOUT</TopButton>
          ) : (
            <TopButton type="filled" disabled>
              CHECKOUT
            </TopButton>
          )}
        </Top>
        <Bottom>
          <Info>
            {products.map((item) => (
              <Product key={item._id}>
                <ProductDetail>
                  <Image src={item.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {item._id}
                    </ProductId>
                    <ProductColorContainer>
                      <ProductColorLabel>Color: </ProductColorLabel>
                      {item.clr.map((c) => (
                        <ProductColor color={c}> </ProductColor>
                      ))}
                    </ProductColorContainer>
                    <ProductSize>
                      <b>Size:</b> {item.sz.map((s) => s)}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove onClick={() => handleDecrement(item)} />
                    <Amount>{item.qty}</Amount>
                    <Add onClick={() => handleIncrement(item)} />
                  </ProductAmountContainer>
                  <ProductPrice>{item.price}</ProductPrice>
                  <Delete
                    type="button"
                    color="primary"
                    onClick={() => handleDelete(item)}
                  />
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {totalAmount.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>
                {products.length < 1 ? "$0" : "$ 5.90"}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>
                {products.length < 1 ? "$0" : "$ -5.90"}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText type="total">Total</SummaryItemText>
              <SummaryItemPrice>
                $ {(totalAmount - (products.length < 1 ? 0 : 5.9)).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
            <ButtonContainer>
              <StyledLink to="/payment">
                {products.length >= 1 ? (
                  <Button>CHECKOUT NOW</Button>
                ) : (
                  <Button type="button" disabled>
                    CHECKOUT NOW
                  </Button>
                )}
              </StyledLink>
            </ButtonContainer>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
