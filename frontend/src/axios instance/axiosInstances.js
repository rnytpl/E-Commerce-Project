import axios from "axios";

export const stripeAxios = axios.create({
  baseURL: "http://localhost:4000/api/stripe",
});

export const publicRequest = axios.create({
  baseURL: "http://localhost:4000/api",
});
