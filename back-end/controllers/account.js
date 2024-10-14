import { Router } from "express";
import Account from "../models/account.js";
import { upload } from "../middleware/upload.js";
import {
  generateRandomAccountNumber,
  generateLithuanianIBAN,
  generateRandomBankCode,
} from "../helpers/iban.js";
import { checkAuth } from "../middleware/auth.js";

const router = Router();

// Get all accounts
router.get("/", checkAuth, async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ error: "Unable to reach server" });
  }
});

// Get account by id
router.get("/:id", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "Unable to reach server" });
  }
});

//Create account
router.post(
  "/create",
  checkAuth,
  upload.single("idPhoto"),
  async (req, res) => {
    try {
      req.body.idPhoto = req.file ? req.file.filename : null;
      req.body.user = req.session.isLoggedIn;

      const bankCode = generateRandomBankCode();

      const accountNumber = generateRandomAccountNumber();

      const iban = generateLithuanianIBAN(bankCode, accountNumber);

      req.body.iban = iban;
      req.body.accountNumber = accountNumber;
      req.body.bankCode = bankCode;

      const account = await Account.create(req.body);

      res.status(201).json({
        message: "Account created successfully",
        data: account,
      });
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//Delete account
router.delete("/:id", async (req, res) => {
  try {
    const deletedAccount = await Account.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      return res.status(404).json({ error: "Account not found." });
    }
    res.json({
      message: "Account successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete account." });
  }
});

//Update account
router.put("/:id", async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!account) {
      return res.status(404).json({ error: "Account not found." });
    }

    res.json({
      message: "Account successfully updated!",
      updatedAccount: account,
    });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ error: "Unable to update account." });
  }
});

export default router;
