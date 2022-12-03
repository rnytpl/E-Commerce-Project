import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../../Store/cartSlice";
export const Success = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.cart);

  const token = currentUser.accessToken;
  console.log("success", token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createOrder(token));
  }, []);

  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  return (
    <>
      <div>Thank you!</div>
      <Link to="/">Go Back</Link>
    </>
  );
};
