import { Router } from "express";
import {
  createTransactionsController,
  getTransactionsController,
} from "./controllers";
import { transactionValidator } from "./validator";

export const router = Router();

router.get("/", getTransactionsController);
router.post("/", transactionValidator, createTransactionsController);

export const transactionRouter = router;
