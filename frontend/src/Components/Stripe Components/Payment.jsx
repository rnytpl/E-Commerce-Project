import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { stripeAxios } from "../../axios instance/axiosInstances";
import "./PaymentStyle.css";
import { useSelector } from "react-redux";

export const Payment = () => {
  const [stripePromise, setStripePromise] = useState("haha");
  const [clientSecret, setClientSEcret] = useState("");
  const { totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await stripeAxios.get(`/config`);
      setStripePromise(loadStripe(data.publishableKey));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getPayment = async () => {
      const { data } = await stripeAxios.post("/create-payment-intent", {
        amount: totalAmount,
      });
      setClientSEcret(data.clientSecret);
    };
    getPayment();
  }, [totalAmount]);

  return (
    <>
      <h1>React Stripe</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
