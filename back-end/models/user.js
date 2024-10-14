import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/],
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
