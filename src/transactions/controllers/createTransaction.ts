import { Request, Response } from "express";
import { createTransactionFromRepository } from "../repositories";

export async function createTransactionsController(
  req: Request,
  res: Response
): Promise<void> {
  const data = req.body;
  const transaction = await createTransactionFromRepository(data);
  res.status(201).json(transaction);
}
