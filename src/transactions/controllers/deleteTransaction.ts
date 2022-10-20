import { Request, Response } from "express";
import { deleteTransactionFromRepository } from "../repositories";

export async function deleteTransactionController(
  req: Request,
  res: Response
): Promise<Response> {
  const isSuccess = await deleteTransactionFromRepository(req.params.id);
  if (!isSuccess) {
    return res.sendStatus(502);
  }
  return res.sendStatus(204);
}
