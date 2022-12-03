import Sidebar from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import NewUser from "./pages/newUser/NewUser";
import { ProductList } from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LoginModal } from "./pages/login/LoginModal";
import { useEffect } from "react";
import { getStats, getAllUsers } from "./store/userSlice";
import { getAllOrders, getIncome } from "./store/orderSlice";
import { Loader } from "./components/Loader/Loader";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  margin: auto;
`;

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    currentUser && dispatch(getAllUsers(currentUser.accessToken));
    currentUser && dispatch(getStats(currentUser.accessToken));
    currentUser && dispatch(getAllOrders(currentUser.accessToken));
    currentUser && dispatch(getIncome(currentUser.accessToken));
  }, [dispatch, currentUser]);

  if (isLoading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {!currentUser || !currentUser.isAdmin ? (
        <LoginModal />
      ) : (
        <Wrapper>
          <Router>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/users" element={<UserList />} />
                <Route exact path="/newUser" element={<NewUser />} />
                <Route exact path="/products" element={<ProductList />} />
                <Route exact path="/product/:id" element={<Product />} />
                <Route exact path="/newproduct" element={<NewProduct />} />
              </Routes>
            </div>
          </Router>
        </Wrapper>
      )}
    </>
  );
};

export default App;
