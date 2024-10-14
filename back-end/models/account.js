import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Account",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
      },
      idNumber: {
        type: String,
        required: true,
      },
      idPhoto: {
        type: String,
        required: true,
      },
      iban: {
        type: String,
        required: true,
      },
      bankCode: {
        type: String,
        required: true,
      },
      money: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  )
);
