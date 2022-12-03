import React from "react";
import styled from "styled-components";
import { Search, ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile } from "../responsive.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Store/userSlice";

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #fff1f1;
  ${mobile({
    height: "50px",
  })}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  ${mobile({
    padding: "10px 0px",
  })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({
    display: "none",
  })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 0.2rem;
`;

const Input = styled.input`
  border: none;
  ${mobile({
    width: "50px",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({
    fontSize: "24px",
  })}
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    justifyContent: "center",
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-right: 0.5rem;
  ${mobile({
    fontSize: "12px",
    marginLeft: "10px",
  })}
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <StyledLink to="/">
            <Logo>LAMA</Logo>
          </StyledLink>
        </Center>
        <Right>
          {!currentUser ? (
            <React.Fragment>
              <StyledLink to="/register">
                <MenuItem>REGISTER</MenuItem>
              </StyledLink>
              <StyledLink to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </StyledLink>
            </React.Fragment>
          ) : (
            <MenuItem onClick={() => handleLogout()}>LOGOUT</MenuItem>
          )}
          <MenuItem>
            <StyledLink to="/cart">
              <Badge badgeContent={totalQuantity} color="primary">
                <ShoppingCart />
              </Badge>
            </StyledLink>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
