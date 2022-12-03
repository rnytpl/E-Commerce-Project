import mongoose from "mongoose";
import { Schema } from "mongoose";
import CryptoJS from "crypto-js";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

// Before saving document, pre hook comes in to check whether password is modified
// In case of password is modified which means the password is already hashed
// it skips the entire process and moves on
// If password is not modified, encrypt the password using secret passphrase extracted from env file
// & convert returned output into a string and save it in this.password field
userSchema.pre("save", async function (next) {
  console.log("password encrypted 1");
  this.password = CryptoJS.AES.encrypt(
    this.password,
    process.env.CRYPTJS_SECRET_PASSPHRASE
  ).toString();
});

// matchPassword method takes in 'enteredPassword' parameter
// Decrypts password from the instance of User model and returns it as string
// Then checks if decrypted password and password input match then return a boolean value
userSchema.methods.matchPassword = async function (pass) {
  // console.log(pass, "User.js, matchPassword method, first line");
  const decryptedPassword = await CryptoJS.AES.decrypt(
    this.password,
    process.env.CRYPTJS_SECRET_PASSPHRASE
  ).toString(CryptoJS.enc.Utf8);
  // console.log(decryptedPassword, "User.js, show decryptedPassword");
  return decryptedPassword === pass;
};

export const User = mongoose.model("User", userSchema);
