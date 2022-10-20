import { Router } from "express";
import { ObjectId } from "mongodb";
import {
  createTransactionController,
  deleteTransactionController,
  getTransactionController,
  getTransactionsController,
  updateTransactionController,
} from "./controllers";
import { getTransactionFromRepository } from "./repositories";
import { transactionBodyValidator } from "./validator";

export const router = Router();

router.param("id", async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.send(404);
  }

  const transaction = await getTransactionFromRepository(req.params.id);
  if (!transaction) {
    return res.sendStatus(404);
  }
  res.locals.resource = transaction;
  next();
});

router.get("/", getTransactionsController);
router.post("/", transactionBodyValidator, createTransactionController);

router.get("/:id", getTransactionController);
router.put("/:id", transactionBodyValidator, updateTransactionController);
router.delete("/:id", deleteTransactionController);

export const transactionRouter = router;
