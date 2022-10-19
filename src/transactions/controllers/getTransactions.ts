import { Request, Response } from "express";
import { getTransactionsFromRepository } from "../repositories";

export async function getTransactionsController(
  req: Request,
  res: Response
): Promise<void> {
  const transactions = await getTransactionsFromRepository();
  res.json(transactions);
}
