import { Request, Response } from "express";
import { Transaction } from "../../types";
import { updateTransactionFromRepository } from "../repositories";

export async function updateTransactionController(
  req: Request,
  res: Response
): Promise<Response> {
  const data: Transaction = req.body;
  const transaction = await updateTransactionFromRepository(
    req.params.id,
    data
  );
  if (!transaction) {
    return res.sendStatus(502);
  }
  return res.json(transaction);
}
