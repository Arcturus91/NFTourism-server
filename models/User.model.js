const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },

    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    firstName: {
      type: String,
      minLength: 1,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      minLength: 1,
      trim: true,
    required: true
    },
    imageUrl:  {
      type: String,
      default: "https://res.cloudinary.com/dad5dandd/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1664030626/AlpacaExchange/alpacaUserId2_km8k9e.png"
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
