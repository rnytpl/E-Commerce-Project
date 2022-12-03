import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connection successfull"))
    .catch((e) => console.log(e));
};
