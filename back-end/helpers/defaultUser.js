import bcrypt from "bcrypt";
import User from "../models/user.js";

export const createDefaultUser = async () => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      const defaultUser = {
        name: "Marius",
        email: "marius@marius.lt",
        password: "marius",
      };

      const hashedPassword = await bcrypt.hash(defaultUser.password, 10);

      const newUser = new User({
        name: defaultUser.name,
        email: defaultUser.email,
        password: hashedPassword,
      });

      await newUser.save();
      console.log("Default user created successfully!");
    }
  } catch (error) {
    console.error("Error creating default user:", error);
  }
};
