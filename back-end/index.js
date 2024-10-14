import mongoose from "mongoose";
import express from "express";
import account from "./controllers/account.js";
import user from "./controllers/user.js";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import { createDefaultUser } from "./helpers/defaultUser.js";

const config = dotenv.config().parsed;

try {
  await mongoose.connect(config.MONGO_URL);

  console.log("Connected!");

  const app = express();

  app.set("trust proxy", 1);

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
        secure: false,
        httpOnly: true,
      },
    })
  );

  app.use("/photos", express.static("./idPhotos"));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    cors({
      origin: config.DEV_CLIENT_URL,
      credentials: true,
    })
  );

  app.use("/api/account", account);
  app.use("/api/user", user);

  await createDefaultUser();

  app.listen(config.DEV_PORT);
} catch (e) {
  console.log(e);
  console.log("Error connecting to MongoDB(Bananas)");
}
