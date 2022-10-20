import { Request, Response } from "express";
import { Transaction } from "../../types";
import { createTransactionFromRepository } from "../repositories";

export async function createTransactionController(
  req: Request,
  res: Response
): Promise<void> {
  const data: Transaction = req.body;
  const transaction = await createTransactionFromRepository(data);
  res.status(201).json(transaction);
}
